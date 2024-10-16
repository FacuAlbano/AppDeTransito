import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoLeft from '../assets/logo-left.png';  // Importamos las imágenes correctamente
import logoRight from '../assets/logo-right.png'; // Importamos la imagen de logo derecho

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userToken'); // Cerrar sesión eliminando token
      console.log('Cerrar sesión');
      navigate('/login');
    } else {
      navigate('/login'); // Redirigir a login si no está logueado
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><img src={logoLeft} alt="Logo Izquierda" className="nav-logo-left" /></li>
        <li><Link to="/">TRRO</Link></li>
        <li><Link to="/images">Imágenes</Link></li>
        <li><Link to="/usuario">Usuario</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li><Link to="/lines">Líneas de Colectivos</Link></li>
        <li><img src={logoRight} alt="Logo Derecha" className="nav-logo-right" /></li>
        <li>
          <button className="login-btn" onClick={handleLoginLogout}>
            {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
