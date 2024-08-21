const API_Key = 'AIzaSyCnUJSWrfQEDu1FwBe3G3l-f1k_hmveTS4'
const mapId = 'af816b56ad25fdab'
import { APIProvider, Map, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const options = {
    enableHighAccuracy: true
}
function success(pos, setMyLocation) {
    const { latitude: lat, longitude: lng } = pos.coords;
    setMyLocation({ lat, lng });
}
function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}

function PoiMarker({ pois }) {
    return (
        <>
            {pois.map((poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                    <Pin background={'#ff0000'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default function MapComp() {
    const [Mylocation, setMyLocation] = useState(null);
    const locations = [
        { key: 'myHome', location: Mylocation },
        { key: 'One Lapraka', location: { lat: 41.3404200, lng: 19.7884180 } },
    ]
    useEffect(() => {
        const id = navigator.geolocation.watchPosition((pos) => success(pos, setMyLocation), error, options);
        return () => navigator.geolocation.clearWatch(id);
    }, []);
    return (
        <div className="relative w-full md:h-[700px] h-[400px] my-3">

            {Mylocation ? <APIProvider apiKey={API_Key} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={20}
                    defaultCenter={ Mylocation }
                    mapId={mapId}
                    mapTypeId="satellite"
                    className="w-full h-full"
                />
                <PoiMarker pois={locations} />
            </APIProvider> : ''}
        </div>
    )
}