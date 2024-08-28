import { useLocationStore } from '../stores/location';

export const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      useLocationStore.setState({
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
    },
    console.error,
    {
      enableHighAccuracy: true,
    },
  );
};
