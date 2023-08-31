import GeoJSON from 'ol/format/GeoJSON';
import Group from 'ol/layer/Group';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay.js';
import Select from 'ol/interaction/Select.js';
import TileWMS from 'ol/source/TileWMS.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import colormap from 'colormap';
import { Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer } from 'ol/layer';
import Collection from 'ol/Collection.js';
import { click } from 'ol/events/condition.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';

import { EVENT_GROUP_SET_LAYERS } from './constants';

import { consumeAllEvents, storeMapReference } from './map_events';

// Elemets used to define the colormap
const min = 0; // the smallest area
const max = 20; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'portland',
  nshades: steps,
});

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function get_value(feature) {
  if (feature.getProperties().values) {
    return feature.getProperties().values[0];
  } else {
    return null;
  }
}
function getColor(feature) {
  const value = get_value(feature);
  const f = Math.pow(clamp((value - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}

const selected = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 3,
  }),
});

const possibleLayersCls = {
  vector: { cls: VectorLayer, defaultParams: {} },
  tile: { cls: TileLayer, defaultParams: {} },
};

const possibleSourcesCls = {
  vector: {
    cls: VectorSource,
    defaultParams: {
      format: new GeoJSON(),
    },
  },
  tile: {
    cls: TileWMS,
    defaultParams: {},
  },
};

function featureStyle(feature) {
  return new Style({
    fill: new Fill({
      color: getColor(feature),
    }),
    stroke: new Stroke({
      color: 'rgba(255,255,255,0.8)',
    }),
  });
}

function selectStyle(feature) {
  const selectedStyle = featureStyle(feature); // get dynamic style
  const color = selectedStyle.fill_.color_ || '#eeeeee';
  selected.getFill().setColor(color);
  return selected;
}

function initMap(mapCointainer, { hoverContainer, hoverContent, onClick }) {
  storeMapReference(mapCointainer);
  console.debug('initMap started');

  // Create an overlay to anchor the hover popup to the map.
  const hoverOverlay = new Overlay({
    element: hoverContainer,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  // select interaction working on "click"
  const selectClick = new Select({
    condition: click,
    style: selectStyle,
  });
  //! [feature selection]

  const groups = {};

  const setLayersInGroup = (group, layers = []) => {
    if (!groups[group]) {
      groups[group] = new Group({
        layers: [],
      });
      map.addLayer(groups[group]);
    }

    const olLayers = layers.map((layer) => {
      const { name, type, sourceType, params = {}, sourceParams = {} } = layer;

      const { cls: SourceCls, defaultParams: defaultSourceParams } = possibleSourcesCls[sourceType];
      const { cls: LayerCls, defaultParams: defaultLayerParams } = possibleLayersCls[type];

      const source = new SourceCls({
        ...defaultSourceParams,
        ...sourceParams,
      });

      const olLayer = new LayerCls({
        source: source,
        title: name,
        type: 'base',
        style: featureStyle,
        ...defaultLayerParams,
        ...params,
      });

      return olLayer;
    });

    groups[group].setLayers(new Collection(olLayers));
    groups[group].changed();
    return groups[group].getLayers().getArray();
  };

  // Tile layer
  const tile_layer = new TileLayer({
    source: new OSM(),
  });

  // Create map
  const map = new Map({
    target: mapCointainer,
    layers: [tile_layer],
    overlays: [hoverOverlay],
    view: new View({
      center: fromLonLat([10, 55]),
      zoom: 4,
      maxZoom: 6,
      minZoom: 3,
    }),
  });

  // Hover popup interaction
  function hoverPopup(evt) {
    const coordinate = evt.coordinate;
    const pixel = map.getPixelFromCoordinate(coordinate);

    hoverContent.innerHTML = '';
    if (map.hasFeatureAtPixel(pixel)) {
      map.forEachFeatureAtPixel(pixel, function (feature) {
        if (feature.get('name')) {
          if (feature.get('values')) {
            hoverContent.innerHTML +=
              feature.get('name') + ': ' + feature.get('values')[0].toFixed(2) + '°C <br>';
            hoverOverlay.setPosition(coordinate);
          } else {
            hoverContent.innerHTML += feature.get('name') + ': No value <br>';
            hoverOverlay.setPosition(coordinate);
          }
        }
      });
    } else {
      hoverOverlay.setPosition(undefined);
    }
  }

  // Click popup interaction
  function clickPopup(evt) {
    const coordinate = evt.coordinate;
    const hdms = toStringHDMS(toLonLat(coordinate));
    const lon = hdms.split(' ').slice(4, 9).toString().replaceAll(',', ' ');
    const lat = hdms.split(' ').slice(0, 4).toString().replaceAll(',', ' ');
    // const pixel = map.getPixelFromCoordinate(coordinate);

    onClick(lat, lon);
  }

  map.on('pointermove', hoverPopup);
  map.on('singleclick', clickPopup);
  map.addInteraction(selectClick);

  /* Events management */
  mapCointainer.addEventListener(EVENT_GROUP_SET_LAYERS, function (event) {
    const { group, layers } = event.detail;
    console.debug(`${EVENT_GROUP_SET_LAYERS} event received: ${group}`);
    setLayersInGroup(group, layers);
    console.debug('ol:add-nuts event completed');
  });

  consumeAllEvents();

  console.debug('initMap completed');
  return map;
}

export { initMap };
