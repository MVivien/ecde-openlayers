import DragAndDrop from 'ol/interaction/DragAndDrop';
import Link from 'ol/interaction/Link';
//! [import-draw]
import Draw from 'ol/interaction/Draw';
//! [import-draw]
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import Modify from 'ol/interaction/Modify';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

map.addInteraction(new Link());

const source = new VectorSource();

const layer = new VectorLayer({
  source: source,
});
map.addLayer(layer);

map.addInteraction(
  new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON],
  }),
);

map.addInteraction(
  new Modify({
    source: source,
  }),
);

//! [draw]
map.addInteraction(
  new Draw({
    type: 'Polygon',
    source: source,
  }),
);
//! [draw]
