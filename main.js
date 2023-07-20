import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

//! [imports]
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Fill, Stroke, Style} from 'ol/style';
import Overlay from 'ol/Overlay.js';
import {fromLonLat} from 'ol/proj';
import colormap from 'colormap';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';
import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
//! [imports]

//! [color]
const min = 0; // the smallest area
const max = 20; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'portland',
  nshades: steps,
});

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
/*closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};*/

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function get_value(feature){
    if (feature.getProperties().values) {
        return feature.getProperties().values[0]} else {
        return null
      };
}
function getColor(feature) {
  //! debugger;
  const value = get_value(feature);
  const f = Math.pow(clamp((value - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}

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
//! [color]

const nuts_0_source = new VectorSource({
  format: new GeoJSON(),
  url: './data/nuts_0.json',
  });
const nuts_1_source = new VectorSource({
  format: new GeoJSON(),
  url: './data/nuts_1.json',
  });
const nuts_2_source = new VectorSource({
  format: new GeoJSON(),
  url: './data/nuts_2.json',
  });
//! [style]

const nuts_0 = new VectorLayer({
  source: nuts_0_source,
  title: "NUTS 0",
  type: "base",
  style: featureStyle,
});
const nuts_1 = new VectorLayer({
  source: nuts_1_source,
  title: "NUTS 1",
  type: "base",
  style: featureStyle,
});
const nuts_2 = new VectorLayer({
  source: nuts_2_source,
  title: "NUTS 2",
  type: "base",
  style: featureStyle,
});

const tile_layer = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  target: 'map-container',
  layers: [
    tile_layer,
    nuts_2,
    nuts_1,
    nuts_0,
  ],
  overlays: [overlay],
  view: new View({
    center: fromLonLat([10, 55]),
    zoom: 4,
  }),
});

const layerSwitcher = new LayerSwitcher({
  reverse: true,
  activationMode: 'click',
  startActive: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);
/*map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});*/

document.querySelectorAll('input[name="layer_choice"]').forEach((elem)=> {
  var item = elem.value;
  var bool = elem.checked;
  map.getAllLayers()[item].setVisible(bool);
});

/*if (document.querySelector('input[name="layer_choice"]')) {
  document.querySelectorAll('input[name="layer_choice"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
      var item = event.target.value;
      var bool = event.target.checked;
      map.getAllLayers().forEach(function(layer) {
        layer.setVisible(false)
        });
      map.getAllLayers()[0].setVisible(bool);
      map.getAllLayers()[item].setVisible(bool);
    });
  });
}*/

function onMouseMove(browserEvent) {
    var coordinate = browserEvent.coordinate;
    var pixel = map.getPixelFromCoordinate(coordinate);

    content.innerHTML = '';
    if (map.hasFeatureAtPixel(pixel)){
    map.forEachFeatureAtPixel(pixel, function(feature) {
      if (feature.get('name')){
        content.innerHTML += feature.get('name') + ': ' + feature.get('values')[0].toFixed(2) +'°C <br>';
        overlay.setPosition(coordinate);
      }
    });
    } else {
        overlay.setPosition(undefined);
    }
    //overlay.setPosition(undefined);

}
map.on('pointermove', onMouseMove);


