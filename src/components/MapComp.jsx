import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const options = {
    enableHighAccuracy: true
}
function success(pos, setLocation) {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocation({ lat, lng });
}
function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }
export default function MapComp() {
    const [location, setLocation] = useState(null);
    
    useEffect(() => {
        const id = navigator.geolocation.watchPosition((pos) => success(pos, setLocation), error, options);
        return () => navigator.geolocation.clearWatch(id);
    }, []);
    return (
        <div>
            {
                location && <p>Latitude: {location.lat} and Longtitude: {location.lng}</p>
            }
        </div>
    )
}