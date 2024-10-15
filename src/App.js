import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';  // Asegúrate de que RegisterForm.js también esté en src
import Login from './Login';  // Asegúrate de que Login.js también esté en src

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Ruta para el formulario de registro */}
          <Route path="/register" element={<RegisterForm />} />

          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />

          {/* Ruta por defecto, redirigir al login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
