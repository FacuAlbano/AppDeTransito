import React, { useEffect, useState } from 'react';
import { loadGoogleMapsApi } from '../utils/loadGoogleMapsApi';

function Map() {
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const google = await loadGoogleMapsApi();
        const mapInstance = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -32.944242, lng: -60.650539 },
          zoom: 14,
        });
        setMap(mapInstance);
        console.log("Mapa inicializado correctamente.");
      } catch (error) {
        console.error("Error al inicializar el mapa:", error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserPosition(pos);
        map.setCenter(pos);

        // Volver a usar el objeto Marker
        new window.google.maps.Marker({
          position: pos,
          map: map,
          title: 'Tu ubicación',
        });
      });
    }
  }, [map]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

export default Map;
