import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

// imports
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import Group from "ol/layer/Group";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style } from "ol/style";
import Overlay from "ol/Overlay.js";
import { fromLonLat } from "ol/proj";
import colormap from "colormap";
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import TileWMS from 'ol/source/TileWMS.js';
import { toLonLat } from "ol/proj.js";
import { toStringHDMS } from "ol/coordinate.js";
import OSM from "ol/source/OSM";
import LayerSwitcher from "ol-layerswitcher";
import Geocoder from "ol-geocoder";
import Select from "ol/interaction/Select.js";
import { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";
import { altKeyOnly, click, pointerMove } from "ol/events/condition.js";

// Elemets used to define the colormap
const min = 0; // the smallest area
const max = 20; // the biggest area
const steps = 50;
const ramp = colormap({
  colormap: "portland",
  nshades: steps,
});

// Elements that make up the hover popup.
const hoverContainer = document.getElementById("hover-popup");
const hoverContent = document.getElementById("hover-popup-content");

// Elements that make up the click popup.
const clickContainer = document.getElementById("click-popup");
const clickContent = document.getElementById("click-popup-content");
const clickCloser = document.getElementById("click-popup-closer");

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

function featureStyle(feature) {
  return new Style({
    fill: new Fill({
      color: getColor(feature),
    }),
    stroke: new Stroke({
      color: "rgba(255,255,255,0.8)",
    }),
  });
}
//! [color]

//! [feature selection]
let select = null; // ref to currently selected interaction

const selected = new Style({
  fill: new Fill({
    color: "#eeeeee",
  }),
  stroke: new Stroke({
    color: "rgba(255, 255, 255, 0.7)",
    width: 3,
  }),
});

function selectStyle(feature) {
  const selectedStyle = featureStyle(feature); // get dynamic style
  const color = selectedStyle.fill_.color_ || "#eeeeee";
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
  url: "./data/nuts_0.json",
});
const nuts_1_source = new VectorSource({
  format: new GeoJSON(),
  url: "./data/nuts_1.json",
});
const nuts_2_source = new VectorSource({
  format: new GeoJSON(),
  url: "./data/nuts_2.json",
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

// Defining a WMS layer
const blackCarbon = new TileLayer({
    source: new TileWMS({
      url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
      params: {'LAYERS': 'composition_bbaod550'},
    }),
    title: "Black carbon aerosol optical depth at 550 nm"
  })

// Defining a WMS layer
const so2Surface = new TileLayer({
    source: new TileWMS({
      url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
      params: {'LAYERS': 'composition_so2_surface'},
    }),
    title: "Sulphur dioxide at surface",
    visible: false
  })

// Defining a WMS layer
const aod550 = new TileLayer({
    source: new TileWMS({
      url: 'http://eccharts.ecmwf.int/wms/?token=public&request=GetCapabilities&version=1.3.0',
      params: {'LAYERS': 'composition_aod550'},
    }),
    title: "Total aerosol optical depth at 550 nm",
    visible: false
  })

// Creating a Group for WMS layers
const eccharts = new Group({
  title: 'eccharts',
  fold: 'open',
  layers: [blackCarbon, so2Surface, aod550]
  })

// Creating a Group for feature layers
const nutsRegions = new Group({
  title: 'NUTS Regions',
  fold: 'open',
  layers: [nuts_2, nuts_1, nuts_0]
  })

// Create map
const map = new Map({
  target: "map-container",
  layers: [tile_layer, nutsRegions, eccharts],
  overlays: [clickOverlay, hoverOverlay],
  view: new View({
    center: fromLonLat([10, 55]),
    zoom: 4,
    maxZoom: 6,
    minZoom: 3,
  }),
});

// Add layer switcher
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  activationMode: "click",
  startActive: true,
  groupSelectStyle: "group",
});
map.addControl(layerSwitcher);

var geocoder = new Geocoder("nominatim", {
  provider: "osm",
  lang: "en",
  placeholder: "Search for ...",
  limit: 5,
  debug: false,
  autoComplete: true,
  keepOpen: true,
});
map.addControl(geocoder);

// Function removing the pin Geocoder is using by default
function remove_search_pin() {
  var remove_layer_name = "geocoder-layer";
  var layers_to_remove = [];
  map.getLayers().forEach(function (layer) {
    var layer_name = layer.getProperties().name;
    if (layer_name && layer_name.match(remove_layer_name)) {
      layers_to_remove.push(layer);
    }
  });

  for (var i = 0; i < layers_to_remove.length; i++) {
    map.removeLayer(layers_to_remove[i]);
  }
}

// Listen when an address is chosen
geocoder.on("addresschosen", function (evt) {
  remove_search_pin();
  clickPopup(evt);
});

// Hover popup interaction
function hoverPopup(evt) {
  const coordinate = evt.coordinate;
  const pixel = map.getPixelFromCoordinate(coordinate);

  hoverContent.innerHTML = "";
  if (map.hasFeatureAtPixel(pixel)) {
    map.forEachFeatureAtPixel(pixel, function (feature) {
      if (feature.get("name")) {
        if (feature.get("values")) {
          hoverContent.innerHTML +=
            feature.get("name") +
            ": " +
            feature.get("values")[0].toFixed(2) +
            "°C <br>";
          hoverOverlay.setPosition(coordinate);
        } else {
          hoverContent.innerHTML += feature.get("name") + ": No value <br>";
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
  const lon = hdms.split(" ").slice(4, 9).toString().replaceAll(",", " ");
  const lat = hdms.split(" ").slice(0, 4).toString().replaceAll(",", " ");
  const pixel = map.getPixelFromCoordinate(coordinate);

  clickContent.innerHTML = "You clicked here:<br>";
  if (map.hasFeatureAtPixel(pixel)) {
    map.forEachFeatureAtPixel(pixel, function (feature) {
      if (feature.get("name")) {
        clickContent.innerHTML += feature.get("name") + "<br>";
      }
    });
  }
  clickContent.innerHTML += "<code>" + lat + "<br>" + lon + "</code>";
  hoverOverlay.setPosition(undefined);
  clickOverlay.setPosition(coordinate);
}

map.on("pointermove", hoverPopup);
map.on("singleclick", clickPopup);
map.addInteraction(selectClick);
