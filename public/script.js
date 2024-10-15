// Evitar autocompletar en campos sensibles
document.getElementById('registerForm').setAttribute('autocomplete', 'off');

// Validación del nombre
document.getElementById('nombre').addEventListener('input', function () {
    const nombre = document.getElementById('nombre').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        document.getElementById('nombre').setCustomValidity('El nombre solo puede contener letras.');
    } else {
        document.getElementById('nombre').setCustomValidity('');
    }
    // Usar reportValidity solo si setCustomValidity ha cambiado el estado
    if (!document.getElementById('nombre').checkValidity()) {
        document.getElementById('nombre').reportValidity();
    }
});

// Validación del apellido
document.getElementById('apellido').addEventListener('input', function () {
    const apellido = document.getElementById('apellido').value.trim();
    if (!/^[a-zA-Z\s]+$/.test(apellido)) {
        document.getElementById('apellido').setCustomValidity('El apellido solo puede contener letras.');
    } else {
        document.getElementById('apellido').setCustomValidity('');
    }
    if (!document.getElementById('apellido').checkValidity()) {
        document.getElementById('apellido').reportValidity();
    }
});

// Validación del DNI
document.getElementById('dni').addEventListener('input', function () {
    const dni = document.getElementById('dni').value.trim();
    if (!/^\d+$/.test(dni)) {
        document.getElementById('dni').setCustomValidity('El DNI solo puede contener números.');
    } else {
        document.getElementById('dni').setCustomValidity('');
    }
    if (!document.getElementById('dni').checkValidity()) {
        document.getElementById('dni').reportValidity();
    }
});

// Validación de la fecha de nacimiento
document.getElementById('fecha_nacimiento').addEventListener('blur', function () {
    const fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    const hoy = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
        document.getElementById('fecha_nacimiento').setCustomValidity('Por favor, ingrese una fecha de nacimiento válida.');
    } else if (fechaNacimiento > hoy) {
        document.getElementById('fecha_nacimiento').setCustomValidity('La fecha de nacimiento no puede ser futura.');
    } else {
        document.getElementById('fecha_nacimiento').setCustomValidity('');
    }
    if (!document.getElementById('fecha_nacimiento').checkValidity()) {
        document.getElementById('fecha_nacimiento').reportValidity();
    }
});

// Validación del correo electrónico
document.getElementById('email').addEventListener('input', function () {
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').setCustomValidity('El correo electrónico no es válido.');
    } else {
        document.getElementById('email').setCustomValidity('');
    }
    if (!document.getElementById('email').checkValidity()) {
        document.getElementById('email').reportValidity();
    }
});

// Confirmar el correo electrónico
document.getElementById('confirm_email').addEventListener('input', function () {
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirm_email').value.trim();
    if (email !== confirmEmail) {
        document.getElementById('confirm_email').setCustomValidity('Los correos electrónicos no coinciden.');
    } else {
        document.getElementById('confirm_email').setCustomValidity('');
    }
    if (!document.getElementById('confirm_email').checkValidity()) {
        document.getElementById('confirm_email').reportValidity();
    }
});

// Validación de la contraseña con las reglas: mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
document.getElementById('password').addEventListener('blur', function () {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value.trim();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (!passwordRegex.test(password)) {
        document.getElementById('password').setCustomValidity('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un símbolo.');
    } else {
        document.getElementById('password').setCustomValidity('');
    }

    if (password !== confirmPassword && confirmPassword !== '') {
        document.getElementById('confirm_password').setCustomValidity('Las contraseñas no coinciden.');
    } else {
        document.getElementById('confirm_password').setCustomValidity('');
    }

    document.getElementById('password').reportValidity();
    document.getElementById('confirm_password').reportValidity();
});

// Validar confirmación de contraseña
document.getElementById('confirm_password').addEventListener('blur', function () {
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
        event.preventDefault();
        alert('Por favor, corrija los errores antes de enviar.');
    }
});

// Función para alternar visibilidad de la contraseña
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
