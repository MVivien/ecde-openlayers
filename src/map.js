import GeoJSON from 'ol/format/GeoJSON';
import Group from 'ol/layer/Group';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-layerswitcher';
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
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4.js';
import { get as getProjection } from 'ol/proj.js';

import { EVENT_GROUP_SET_LAYERS } from './constants';

import { consumeAllEvents, storeMapReference } from './map_events';

proj4.defs(
  'EPSG:3035',
  '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
register(proj4);
const europeProjection = getProjection('EPSG:3035');

// Elemets used to define the colormap
const min = 0; // the smallest area
const max = 20; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'portland',
  nshades: steps,
});

const attributions =
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank" >&copy; Powered by the <b>Copernicus Climate and Atmosphere Data Store</b></a>';

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function get_value(feature) {
  if (feature.getProperties().value) {
    return feature.getProperties().value;
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

  // Add layer switcher
  const layerSwitcher = new LayerSwitcher({
    reverse: true,
    activationMode: 'click',
    startActive: true,
    groupSelectStyle: 'group',
    collapseLabel: '',
  });

  const switcherGroup = new Group({
    title: '',
    fold: 'open',
    layers: [],
    name: 'switcherGroup',
  });

  const setLayersInGroup = (title, layers = []) => {
    let layerList;
    if (switcherGroup.getProperties().title == title) {
      layerList = switcherGroup.getLayersArray();
      layers.forEach(function (_, i) {
        const { name, type, sourceType, params = {}, sourceParams = {} } = layers[i];
        const { cls: SourceCls, defaultParams: defaultSourceParams } =
          possibleSourcesCls[sourceType];
        const { cls: LayerCls, defaultParams: defaultLayerParams } = possibleLayersCls[type];
        const source = new SourceCls({
          ...defaultSourceParams,
          ...layers[i].sourceParams,
        });
        layerList[i].setSource(source);
        layerList[i].setStyle(featureStyle);
      });
    } else {
      layerList = layers.map((layer) => {
        const { name, type, sourceType, params = {}, sourceParams = {} } = layer;

        const { cls: SourceCls, defaultParams: defaultSourceParams } =
          possibleSourcesCls[sourceType];
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

      switcherGroup.setLayers(new Collection(layerList));
      switcherGroup.setProperties({ title: title });
    }

    switcherGroup.changed();
    layerSwitcher.renderPanel();
    return switcherGroup.getLayers().getArray();
  };

  // Tile layer
  const tile_layer = new TileLayer({
    source: new OSM({
      attributions: attributions,
    }),
  });

  // Create map
  const map = new Map({
    target: mapCointainer,
    layers: [tile_layer],
    overlays: [hoverOverlay],
    view: new View({
      projection: europeProjection,
      center: fromLonLat([40, 28]),
      zoom: 4.5,
      maxZoom: 6,
      minZoom: 3,
    }),
  });

  map.addLayer(switcherGroup);

  // Hover popup interaction
  function hoverPopup(evt) {
    const coordinate = evt.coordinate;
    const pixel = map.getPixelFromCoordinate(coordinate);

    hoverContent.innerHTML = '';
    if (map.hasFeatureAtPixel(pixel)) {
      map.forEachFeatureAtPixel(pixel, function (feature) {
        if (feature.get('name') && hoverContent.innerHTML == '') {
          if (feature.get('value')) {
            hoverContent.innerHTML +=
              feature.get('name') +
              ': ' +
              feature.get('value').toFixed(2) +
              ' tropical nights <br>';
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
    const pixel = map.getPixelFromCoordinate(coordinate);
    let region = '';
    let regionName = '';
    let selectedLayer = '';

    if (map.hasFeatureAtPixel(pixel)) {
      map.forEachFeatureAtPixel(pixel, function (feature) {
        region = feature.get('region_id');
        regionName = feature.get('name');
        selectedLayer = feature.get('layer');
      });

      onClick(lat, lon, region, regionName, selectedLayer);
    } else {
      region = 'no region selected';
      regionName = 'no region selected';
      selectedLayer = 'no layer selected';
    }
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

  map.addControl(layerSwitcher);
  consumeAllEvents();

  console.debug('initMap completed');
  return map;
}

export { initMap };
