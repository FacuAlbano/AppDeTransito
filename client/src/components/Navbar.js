import React from 'react';
import logoIzquierda from '../assets/logo-left.png'; // Logo izquierdo
import logoDerecha from '../assets/logo-right.png'; // Logo derecho

function Navbar() {
    return (
        <nav className="navbar">
            <img src={logoIzquierda} alt="Logo izquierda" className="nav-logo" />
            <ul>
                <li><a href="/">TRRO</a></li>
                <li><a href="/colectivos">Colectivos</a></li>
                <li><a href="/galleria">Galleria</a></li>
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/usuario">Usuario</a></li>
            </ul>
            <img src={logoDerecha} alt="Logo derecha" className="nav-logo" />
            <button className="logout-button">Cerrar sesión</button>
        </nav>
    );
}

export default Navbar;
