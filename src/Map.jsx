import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { initMap } from './map.js';

import 'ol-geocoder/dist/ol-geocoder.min.css';
import 'ol-popup/src/ol-popup.css';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import './map.css';

function Map({ onClick }) {
  // References map items
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  // Elements that make up the hover popup.
  const hoverContainer = useRef(null);
  const hoverContent = useRef(null);
  // monitor viewport
  const resizeObserver = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = initMap(mapContainer.current, {
        hoverContainer: hoverContainer.current,
        hoverContent: hoverContent.current,
        onClick: onClick,
      });

      // monitor viewport size changes
      resizeObserver.current = new ResizeObserver(() => {
        // mapRef.current.updateSize();
      });
      resizeObserver.current.observe(document.body);
    }

    // return () => {
    //   resizeObserver?.current?.disconnect();
    // };
  }, [onClick]);

  return (
    <>
      <div id="map-container" ref={mapContainer}></div>
      <div id="hover-popup" className="ol-click-popup" ref={hoverContainer}>
        <div id="hover-popup-content" ref={hoverContent}></div>
      </div>
    </>
  );
}

Map.propTypes = {
  onClick: PropTypes.func,
};

export default Map;
