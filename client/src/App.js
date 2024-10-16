import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';

function App() {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        // Acceder a la variable de entorno
        const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
        script.async = true;
        script.onload = () => {
          console.log('Google Maps API loaded successfully.');
        };
        script.onerror = () => {
          console.error('Error loading Google Maps API.');
        };
        document.body.appendChild(script);
      } else {
        console.log('Google Maps API already loaded.');
      }
    };

    loadGoogleMapsScript();

    return () => {
      const googleScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (googleScript) {
        document.body.removeChild(googleScript);
      }
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
