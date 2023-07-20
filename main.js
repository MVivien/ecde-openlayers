import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

// imports
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
import Select from 'ol/interaction/Select.js';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition.js';


// Elemets used to define the colormap
const min = 0; // the smallest area
const max = 20; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: 'portland',
  nshades: steps,
});

// Elements that make up the hover popup.
const hoverContainer = document.getElementById('hover-popup');
const hoverContent = document.getElementById('hover-popup-content');

// Elements that make up the click popup.
const clickContainer = document.getElementById('click-popup');
const clickContent = document.getElementById('click-popup-content');
const clickCloser = document.getElementById('click-popup-closer');

// Create an overlay to anchor the hover popup to the map.
const hoverOverlay = new Overlay({
  element: hoverContainer,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

// Create an overlay to anchor the click popup to the map.
const clickOverlay = new Overlay({
  element: clickContainer,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

// Add a click handler to hide the popup.
clickCloser.onclick = function () {
  clickOverlay.setPosition(undefined);
  clickCloser.blur();
  return false;
};

//! [color]
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

//! [feature selection]
let select = null; // ref to currently selected interaction

const selected = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 3,
  }),
});

function selectStyle(feature) {
  const selectedStyle = featureStyle(feature) // get dynamic style
  const color = selectedStyle.fill_.color_ || '#eeeeee';
  selected.getFill().setColor(color);
  return selected;
}

// select interaction working on "click"
const selectClick = new Select({
  condition: click,
  style: selectStyle,
});
//! [feature selection]

// Vector layers source definition
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

// Vector layers definition
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

// Tile layer
const tile_layer = new TileLayer({
  source: new OSM(),
});

// Create map
const map = new Map({
  target: 'map-container',
  layers: [
    tile_layer,
    nuts_2,
    nuts_1,
    nuts_0,
  ],
  overlays: [clickOverlay, hoverOverlay],
  view: new View({
    center: fromLonLat([10, 55]),
    zoom: 4,
  }),
});

// Add layer switcher
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  activationMode: 'click',
  startActive: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);

// Hover popup interaction
function onMouseMove(evt) {
    const coordinate = evt.coordinate;
    const pixel = map.getPixelFromCoordinate(coordinate);

    hoverContent.innerHTML = '';
    if (map.hasFeatureAtPixel(pixel)){
    map.forEachFeatureAtPixel(pixel, function(feature) {
      if (feature.get('name')){
        hoverContent.innerHTML += feature.get('name') + ': ' + feature.get('values')[0].toFixed(2) +'°C <br>';
        hoverOverlay.setPosition(coordinate);
      }
    });
    } else {
        hoverOverlay.setPosition(undefined);
    }
};

// Click popup interaction
function onClick(evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
  const pixel = map.getPixelFromCoordinate(coordinate);

  clickContent.innerHTML = 'You clicked here:<br>'
  if (map.hasFeatureAtPixel(pixel)){
    map.forEachFeatureAtPixel(pixel, function(feature) {
      if (feature.get('name')){
        clickContent.innerHTML += feature.get('name') + '<br>';
      }
    });
  }
  clickContent.innerHTML += '<code>' + hdms + '</code>';
  hoverOverlay.setPosition(undefined);
  clickOverlay.setPosition(coordinate);
  hoverOverlay.setPosition(undefined);
  };

map.on('pointermove', onMouseMove);
map.on('singleclick', onClick);
map.addInteraction(selectClick);



