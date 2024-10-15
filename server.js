const express = require('express');
const cors = require('cors'); // Importar cors correctamente
const path = require('path');
const mysql = require('mysql2');    
const bcrypt = require('bcrypt');  

const app = express(); // Inicializar la app antes de usar middleware

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'build' (si es React)
app.use(express.static(path.join(__dirname, 'build')));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'falbano.106',
    database: 'trro_app_db',
    port: 3307
});

// Verificar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta para servir el formulario de registro
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // Sirve el index de React si existe
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { first_name, last_name, email, password, birth_date, dni, direccion } = req.body;  
    
    // Verificar si los datos llegan correctamente
    console.log('Datos recibidos:', req.body);

    // Calcular la edad del usuario a partir de la fecha de nacimiento
    const birthDate = new Date(birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    
    // Asignar tipo de usuario automáticamente según la edad
    let user_type = '';
    if (age < 16) {
        user_type = 'menor_16';
    } else {
        user_type = 'mayor_16';
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error encriptando la contraseña' });

        // Insertar los datos del usuario en la base de datos
        const query = `INSERT INTO users (first_name, last_name, email, password, birth_date, dni, address, user_type) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [first_name, last_name, email, hashedPassword, birth_date, dni, direccion, user_type], (err, result) => {  
            if (err) {
                console.error('Error al crear el usuario:', err);
                return res.status(500).json({ error: 'Error al crear el usuario' });
            }
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        });
    });
});

// Ruta para servir la aplicación de React (para producción)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
