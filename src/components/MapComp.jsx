import PropTypes from 'prop-types';

const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export const mapId = 'af816b56ad25fdab';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useLocationStore } from '../stores/location';
import { useEffect, useState } from 'react';

const options = {
  enableHighAccuracy: true,
};
function success(pos) {
  const { latitude: lat, longitude: lng } = pos.coords;
  useLocationStore.setState({
    location: {
      lat,
      lng,
  }})
}
function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

export default function MapComp({ houseCoords, setHouseCoords }) {

  const myLocation = useLocationStore((state) => state.location);

  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(15);

  const locations = [
    { key: 'One Lapraka', location: { lat: 41.34042, lng: 19.788418 } },
    { key: 'One DTA', location: { lat: 41.337806, lng: 19.835278 } },
    { key: "Arlindi's Home", location: { lat: 41.326103, lng: 19.827426 } },
    { key: 'Hoxha Tasim', location: { lat: 41.333375, lng: 19.832833 } },
    { key: 'Gazeta Koha Jone', location: { lat: 41.321583, lng: 19.813164 } },
    { key: 'Aba Center', location: { lat: 41.320301, lng: 19.823113 } },
    { key: 'Kullat', location: { lat: 41.322576, lng: 19.81957 } },
    { key: 'Rr.Kavajes', location: { lat: 41.327795, lng: 19.811548 } },
    { key: 'Vizion Plus', location: { lat: 41.337028, lng: 19.803694 } },
    { key: '21 Dhjetori', location: { lat: 41.32609, lng: 19.802995 } },
    { key: 'Test location', location: { lat: 41.325634, lng: 19.830913 } },
  ];

  useEffect(() => {
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => {
        
        success(pos)
      },
      error,
      options,
    );
    
    return () => navigator.geolocation.clearWatch(id);
  },[]);

  useEffect(() => {
    if (houseCoords) {
      setCenter(houseCoords);
      setZoom(18);
    }
  }, [houseCoords]);
  MapComp.propTypes = {
    houseCoords: PropTypes.object,
    setHouseCoords: PropTypes.func,
  };
  return (
    <div className="relative w-full md:h-[700px] h-[400px] my-3">
      {myLocation ? (
        <APIProvider apiKey={API_Key}>
          {houseCoords ? (
            <Map
              zoom={zoom}
              center={center || myLocation}
              onCenterChanged={() => {
                setHouseCoords(null);
              }}
              defaultZoom={15}
              mapId={mapId}
              mapTypeId="roadmap"
              streetViewControl={false}
              mapTypeControl={false}
              gestureHandling={'greedy'}
              zoomControl={false}
              className="w-full h-full"
            >
              {locations.map((location) => {
                return (
                  <AdvancedMarker
                    key={location.key}
                    position={location.location}
                    onClick={() => alert(`This is ${location.key}`)}
                  >
                    <img src="/home_map_icon.png" width={32} height={32} />
                  </AdvancedMarker>
                );
              })}
            </Map>
          ) : (
            <Map
              defaultCenter={myLocation}
              defaultZoom={15}
              mapId={mapId}
              mapTypeId="roadmap"
              streetViewControl={false}
              mapTypeControl={false}
              gestureHandling={'greedy'}
              zoomControl={false}
              className="w-full h-full"
            >
              {locations.map((location) => {
                return (
                  <AdvancedMarker
                    key={location.key}
                    position={location.location}
                    onClick={() => alert(`This is ${location.key}`)}
                  >
                    <img src="/home_map_icon.png" width={32} height={32} />
                  </AdvancedMarker>
                );
              })}
            </Map>
          )}
        </APIProvider>
      ) : (
        ''
      )}
    </div>
  );
}
