const express = require('express'); 
const mysql = require('mysql2');    
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'falbano.106',
    database: 'trro_app_db'
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { email, password, birth_date, dni, address, user_type } = req.body;

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error encriptando la contraseña' });

        // Insertar los datos del usuario en la base de datos
        const query = `INSERT INTO users (email, password, birth_date, dni, address, user_type) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(query, [email, hashedPassword, birth_date, dni, address, user_type], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al crear el usuario' });
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
