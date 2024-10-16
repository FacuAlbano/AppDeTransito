let googleMapsApiPromise = null;

export function loadGoogleMapsApi() {
  if (googleMapsApiPromise) {
    return googleMapsApiPromise;
  }

  googleMapsApiPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
    } else {
      const script = document.createElement('script');
      const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps API failed to load.'));
        }
      };
      script.onerror = () => {
        reject(new Error('Google Maps API failed to load.'));
      };
      document.body.appendChild(script);
    }
  });

  return googleMapsApiPromise;
}
