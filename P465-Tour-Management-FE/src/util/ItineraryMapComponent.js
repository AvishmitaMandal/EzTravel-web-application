import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from "react";

const ItineraryMapComponent = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyDcZYYDCAbz7U-n6qt_7GHPoaG_xbK7NRY",
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
      <div className="itineraryMapComponent">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          />
        )}
      </div>
    );
  };

export default ItineraryMapComponent;