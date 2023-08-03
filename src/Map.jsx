import { useEffect, useRef } from 'react';

import { initMap } from './map.js';

import 'ol-geocoder/dist/ol-geocoder.min.css';
import 'ol-popup/src/ol-popup.css';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import './map.css';

function Map() {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  // Elements that make up the hover popup.
  const hoverContainer = useRef(null);
  const hoverContent = useRef(null);
  // Elements that make up the click popup.
  const clickContainer = useRef(null);
  const clickContent = useRef(null);
  const clickCloser = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = initMap(mapContainer.current, {
        hoverContainer: hoverContainer.current,
        hoverContent: hoverContent.current,
        clickContainer: clickContainer.current,
        clickContent: clickContent.current,
        clickCloser: clickCloser.current,
      });
    }
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainer}></div>
      <div id="hover-popup" className="ol-click-popup" ref={hoverContainer}>
        <div id="hover-popup-content" ref={hoverContent}></div>
      </div>
      <div id="click-popup" className="ol-click-popup" ref={clickContainer}>
        <button
          id="click-popup-closer"
          className="ol-click-popup-closer"
          ref={clickCloser}
        ></button>
        <div id="click-popup-content" ref={clickContent}></div>
      </div>
    </>
  );
}

export default Map;
