import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import Login from './Login';

function App() {
  useEffect(() => {
    // Cargar dinámicamente el script de Google Maps API
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => {
          console.log("Google Maps API loaded successfully.");
        };
        script.onerror = () => {
          console.error("Error loading Google Maps API.");
        };
        document.body.appendChild(script);
      } else {
        console.log("Google Maps API already loaded.");
      }
    };

    loadGoogleMapsScript();

    // Eliminar el script cuando el componente se desmonte
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
