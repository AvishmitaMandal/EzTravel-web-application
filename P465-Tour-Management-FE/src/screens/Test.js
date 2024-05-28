import React, { useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

function renderMarker(map) {
  if (!map) return;
  
  const marker = new window.google.maps.Marker({
    position: { lat: 35.5, lng: 29.7 },
    map: map
  });
}

function MapComponent({ selected }) {
  useEffect(() => {
    if (selected) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = function () {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: 0, lng: 0 },
          zoom: 5,
        });
        
        renderMarker(map);
      };
    }
  }, [selected]);

  return (
    <div>
      {selected && (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            id="map"
            center={{ lat: 0, lng: 0 }}
            zoom={5}
            mapContainerStyle={{ height: '400px', width: '50%', margin: 'auto' }}
          />
        </LoadScript>
      )}
    </div>
  );
}

export default MapComponent;
