// utils/loadGoogleMapsApi.js
let googleMapsLoaded = false;

export const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve(window.google.maps);
      console.log('Google Maps API cargada correctamente.');
    };

    script.onerror = (error) => {
      reject(error);
    };

    document.body.appendChild(script);
  });
};
