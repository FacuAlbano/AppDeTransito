document.getElementById('nombre').addEventListener('input', function () {
    const nombre = document.getElementById('nombre').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        document.getElementById('nombre').setCustomValidity('El nombre solo puede contener letras.');
    } else {
        document.getElementById('nombre').setCustomValidity(''); // Limpiar el mensaje de error si es correcto
    }
    document.getElementById('nombre').reportValidity(); // Mostrar el error inmediatamente
});

document.getElementById('apellido').addEventListener('input', function () {
    const apellido = document.getElementById('apellido').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(apellido)) {
        document.getElementById('apellido').setCustomValidity('El apellido solo puede contener letras.');
    } else {
        document.getElementById('apellido').setCustomValidity('');
    }
    document.getElementById('apellido').reportValidity();
});

document.getElementById('dni').addEventListener('input', function () {
    const dni = document.getElementById('dni').value.trim();
    if (!/^\d+$/.test(dni)) {
        document.getElementById('dni').setCustomValidity('El DNI solo puede contener números.');
    } else {
        document.getElementById('dni').setCustomValidity('');
    }
    document.getElementById('dni').reportValidity();
});

document.getElementById('fecha_nacimiento').addEventListener('blur', function () {
    const fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    if (isNaN(fechaNacimiento.getTime())) {
        document.getElementById('fecha_nacimiento').setCustomValidity('Por favor, ingrese una fecha de nacimiento válida.');
    } else {
        document.getElementById('fecha_nacimiento').setCustomValidity('');
    }
    document.getElementById('fecha_nacimiento').reportValidity();
});

document.getElementById('email').addEventListener('input', function () {
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').setCustomValidity('El correo electrónico no es válido.');
    } else {
        document.getElementById('email').setCustomValidity('');
    }
    document.getElementById('email').reportValidity();
});

document.getElementById('confirm_email').addEventListener('input', function () {
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirm_email').value.trim();
    if (email !== confirmEmail) {
        document.getElementById('confirm_email').setCustomValidity('Los correos electrónicos no coinciden.');
    } else {
        document.getElementById('confirm_email').setCustomValidity('');
    }
    document.getElementById('confirm_email').reportValidity();
});

document.getElementById('password').addEventListener('input', function () {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value.trim();
    if (password !== confirmPassword) {
        document.getElementById('confirm_password').setCustomValidity('Las contraseñas no coinciden.');
    } else {
        document.getElementById('confirm_password').setCustomValidity('');
    }
    document.getElementById('password').reportValidity();
    document.getElementById('confirm_password').reportValidity();
});

document.getElementById('confirm_password').addEventListener('input', function () {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value.trim();
    if (password !== confirmPassword) {
        document.getElementById('confirm_password').setCustomValidity('Las contraseñas no coinciden.');
    } else {
        document.getElementById('confirm_password').setCustomValidity('');
    }
    document.getElementById('confirm_password').reportValidity();
});

// Evitar que el formulario se envíe si hay errores de validación
document.getElementById('registerForm').addEventListener('submit', function (event) {
    if (!this.checkValidity()) {
        event.preventDefault();  // Evita que se envíe el formulario si hay errores
        alert('Por favor, corrija los errores antes de enviar.');
    }
});

// Función para determinar el tipo de usuario según la fecha de nacimiento
function determinarTipoUsuario(fechaNacimiento) {
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad < 16 ? 'menor_16' : 'mayor_16';
}

// Función para mostrar/ocultar contraseñas
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}

function initAutocomplete() {
    const direccionInput = document.getElementById('direccion');
    const autocomplete = new google.maps.places.Autocomplete(direccionInput);
    autocomplete.setFields(['address_components', 'formatted_address']);
    autocomplete.setTypes(['address']);

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.address_components) {
            console.log('No se seleccionó una dirección válida');
            return;
        }

        function getAddressComponent(types) {
            for (let i = 0; i < place.address_components.length; i++) {
                for (let type of types) {
                    if (place.address_components[i].types.includes(type)) {
                        return place.address_components[i].long_name;
                    }
                }
            }
            return '';
        }

        const ciudad = getAddressComponent(['locality']) || getAddressComponent(['administrative_area_level_2']);
        const provincia = getAddressComponent(['administrative_area_level_1']);

        document.getElementById('ciudad').value = ciudad || 'Ciudad no encontrada';
        document.getElementById('provincia').value = provincia || 'Provincia no encontrada';
    });
}

window.addEventListener('load', initAutocomplete);
