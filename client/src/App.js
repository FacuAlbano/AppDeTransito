import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import { loadGoogleMapsApi } from './utils/loadGoogleMapsApi';  // Importa la función centralizada

function App() {
  useEffect(() => {
    const loadMaps = async () => {
      try {
        await loadGoogleMapsApi();  // Cargar la API de forma centralizada
        console.log('Google Maps API cargada correctamente.');
      } catch (error) {
        console.error('Error al cargar Google Maps API:', error);
      }
    };

    loadMaps();  // Llama la función para cargar la API al montar el componente

    return () => {
      // Elimina el script si ya fue agregado antes para evitar duplicaciones
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
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
