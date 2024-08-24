const API_Key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export const mapId = 'af816b56ad25fdab';
import PropTypes from 'prop-types';
import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const options = {
  enableHighAccuracy: true,
};
function success(pos, setMyLocation) {
  const { latitude: lat, longitude: lng } = pos.coords;
  setMyLocation({ lat, lng });
}
function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

function PoiMarker({ pois, setActiveMarker }) {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          onClick={() => setActiveMarker(poi.key)}
        >
          <Pin
            background={'#ff0000'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}
PoiMarker.propTypes = {
  pois: PropTypes.array,
  setActiveMarker: PropTypes.func,
};
export default function MapComp() {
  const [myLocation, setMyLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const locations = [
    { key: 'myLocation', location: myLocation },
    { key: 'One Lapraka', location: { lat: 41.34042, lng: 19.788418 } },
    { key: 'One DTA', location: { lat: 41.337806, lng: 19.835278 } },
  ];

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => success(pos, setMyLocation),
      error,
      options,
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <div className="relative w-full md:h-[700px] h-[400px] my-3">
      {myLocation ? (
        <APIProvider apiKey={API_Key}>
          <Map
            defaultZoom={15}
            defaultCenter={myLocation}
            mapId={mapId}
            mapTypeId="roadmap"
            className="w-full h-full"
          >
            <PoiMarker pois={locations} setActiveMarker={setActiveMarker} />

            {locations.map((location) =>
              activeMarker === location.key ? (
                <InfoWindow
                  key={location.key}
                  position={location.location}
                  onCloseClick={() => setActiveMarker(null)}
                  className=""
                >
                  {location.key}
                </InfoWindow>
              ) : null,
            )}
            <AdvancedMarker position={myLocation}>
              <Pin
                background={'#0000ff'}
                glyphColor={'#fff'}
                borderColor={'#000'}
              />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      ) : (
        ''
      )}
    </div>
  );
}
