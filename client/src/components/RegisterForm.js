import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import { loadGoogleMapsApi } from '../utils/loadGoogleMapsApi';  // Importamos la función centralizada

function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    dni: '',
    birth_date: '',
    usuario: '',
    password: '',
    confirm_password: '',
    email: '',
    confirm_email: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const input = document.getElementsByName(name)[0];

    switch (name) {
      case 'first_name':
      case 'last_name':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          input.setCustomValidity('Este campo solo puede contener letras.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'dni':
        if (!/^\d+$/.test(value)) {
          input.setCustomValidity('El DNI solo puede contener números.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          input.setCustomValidity('El correo electrónico no es válido.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'confirm_email':
        if (value !== formData.email) {
          input.setCustomValidity('Los correos electrónicos no coinciden.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!passwordRegex.test(value)) {
          input.setCustomValidity('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un símbolo.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'confirm_password':
        if (value !== formData.password) {
          input.setCustomValidity('Las contraseñas no coinciden.');
        } else {
          input.setCustomValidity('');
        }
        break;
      case 'birth_date':
        const birthDate = new Date(value);
        const today = new Date();
        if (isNaN(birthDate.getTime()) || birthDate > today) {
          input.setCustomValidity('La fecha de nacimiento no puede ser futura.');
        } else {
          input.setCustomValidity('');
        }
        break;
      default:
        input.setCustomValidity('');
        break;
    }

    input.reportValidity();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll('input');
    let valid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        valid = false;
      }
    });

    if (valid) {
      axios.post('http://localhost:3000/register', formData)
        .then((response) => {
          console.log('Usuario registrado:', response.data);
          navigate('/login');
        })
        .catch((error) => {
          console.error('Error al registrar el usuario:', error);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const googleMaps = await loadGoogleMapsApi();  // Cargar la API de forma centralizada
        const direccionInput = document.getElementById('direccion');
        if (direccionInput) {
          const autocomplete = new googleMaps.places.Autocomplete(direccionInput, {
            fields: ['address_components', 'formatted_address'],
            types: ['address'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) {
              console.log('No se seleccionó una dirección válida');
              return;
            }

            const getAddressComponent = (types) => {
              for (let i = 0; i < place.address_components.length; i++) {
                for (let type of types) {
                  if (place.address_components[i].types.includes(type)) {
                    return place.address_components[i].long_name;
                  }
                }
              }
              return '';
            };

            const ciudad = getAddressComponent(['locality']) || getAddressComponent(['administrative_area_level_2']);
            const provincia = getAddressComponent(['administrative_area_level_1']);

            setFormData((prevData) => ({
              ...prevData,
              ciudad: ciudad || 'Ciudad no encontrada',
              provincia: provincia || 'Provincia no encontrada',
            }));
          });
        }
      } catch (error) {
        console.error('Error al cargar Google Maps API:', error);
      }
    };

    initAutocomplete();
  }, []);

  return (
    <div className="container">
      <div className="register-box">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="user-box">
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            <label>Nombre</label>
          </div>

          <div className="user-box">
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            <label>Apellido</label>
          </div>

          <div className="user-box">
            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
            <label>Dirección</label>
          </div>

          <div className="user-box">
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
            <label>Ciudad</label>
          </div>

          <div className="user-box">
            <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} required />
            <label>Provincia</label>
          </div>

          <div className="user-box">
            <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
            <label>DNI</label>
          </div>

          <div className="user-box">
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
            <label>Fecha de Nacimiento</label>
          </div>

          <div className="user-box">
            <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />
            <label>Usuario</label>
          </div>

          <div className="user-box">
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
            <label>Contraseña</label>
            <span className="toggle-password" onClick={togglePasswordVisibility}>{showPassword ? '👁️' : '🙈'}</span>
          </div>

          <div className="user-box">
            <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
            <label>Confirmar Contraseña</label>
            <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? '👁️' : '🙈'}</span>
          </div>

          <div className="user-box">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Correo Electrónico</label>
          </div>

          <div className="user-box">
            <input type="email" name="confirm_email" value={formData.confirm_email} onChange={handleChange} required />
            <label>Confirmar Correo Electrónico</label>
          </div>

          <button type="submit" id="submit-btn">
            Registrarse
          </button>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
