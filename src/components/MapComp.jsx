const API_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const mapId = 'af816b56ad25fdab'

import { APIProvider, Map, Pin, AdvancedMarker, InfoWindow} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const options = {
    enableHighAccuracy: true
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
                    <Pin background={'#ff0000'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
}

export default function MapComp() {
    const [myLocation, setMyLocation] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null); 
    const locations = [
        { key: 'myLocation', location: myLocation },
        { key: 'One Lapraka', location: { lat: 41.3404200, lng: 19.7884180 } },
        { key: 'One DTA', location: { lat: 41.337806, lng: 19.835278 } }
    ];

    useEffect(() => {
        const id = navigator.geolocation.watchPosition((pos) => success(pos, setMyLocation), error, options);
        return () => navigator.geolocation.clearWatch(id);
    }, []);
    console.log(API_Key);
    return (
        <div className="relative w-full md:h-[700px] h-[400px] my-3">
            {myLocation ? (
                <APIProvider apiKey={API_Key} onLoad={() => console.log('Maps API has loaded.')}>
                    <Map
                        defaultZoom={20}
                        defaultCenter={myLocation}
                        mapId={mapId}
                        mapTypeId="satellite"
                        className="w-full h-full"
                    >
                        <PoiMarker pois={locations} setActiveMarker={setActiveMarker}/>

                        {locations.map((location) =>
                            activeMarker === location.key ? (
                                <InfoWindow
                                    key={location.key}
                                    position={location.location}
                                    onCloseClick={() => setActiveMarker(null)}
                                    className=''
                                >
                                    {location.key}
                                </InfoWindow>
                            ) : null
                        )}
                        <AdvancedMarker position={myLocation}>
                            <Pin background={'#0000ff'} glyphColor={'#fff'} borderColor={'#000'} />
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
            ) : ''
            }
        </div>
    );
}
