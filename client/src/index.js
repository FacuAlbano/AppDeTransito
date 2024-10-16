import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';  // Asegúrate de enlazar tus estilos CSS
import App from './App';  // Asegúrate de que el archivo App.js esté correctamente enlazado

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
