import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function Login() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes hacer la lógica de inicio de sesión, como validar credenciales con tu backend.
    console.log('Datos del login:', formData);

    // Si el login es exitoso, puedes redirigir al usuario a otra página
    // navigate('/dashboard'); 
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirigir a la página de registro
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          {/* Usuario */}
          <div className="user-box">
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
            <label>Usuario</label>
          </div>

          {/* Contraseña */}
          <div className="user-box">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Contraseña</label>
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>

          {/* Botón para iniciar sesión */}
          <button type="submit" id="submit-btn">
            Iniciar Sesión
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Botón para redirigir a la página de registro */}
          <button type="button" id="register-btn" onClick={handleRegisterClick}>
            Registrarse
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
