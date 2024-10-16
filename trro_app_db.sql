USE trro_app_db;

-- Crear la tabla 'usuarios'
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user VARCHAR(50) NOT NULL,  -- Nombre de usuario agregado
    password VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    dni VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    user_type ENUM('menor_16', 'mayor_16', 'transito', 'desarrollador') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuarios ADD UNIQUE (dni);

CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20),  -- Cambiado a dni
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    image_url VARCHAR(255),
    report_status ENUM('activo', 'completado') NOT NULL DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dni) REFERENCES usuarios(dni) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE report_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT,
    dni VARCHAR(20),  -- Cambiado a dni
    action ENUM('confirmar', 'completar') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dni) REFERENCES usuarios(dni) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20),  -- Cambiado a dni
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dni) REFERENCES usuarios(dni) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20),  -- Cambiado a dni
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    route_details TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dni) REFERENCES usuarios(dni) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserción de usuarios de tipo 'transito'
INSERT INTO usuarios (first_name, last_name, email, user, password, birth_date, dni, address, user_type)
VALUES 
('Carlos', 'Pérez', 'transito1@example.com', 'carlosperez', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1985-03-21', '12345678', 'Calle Falsa 123', 'transito'),
('Ana', 'García', 'transito2@example.com', 'anagarcia', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1987-05-11', '23456789', 'Calle Verdadera 456', 'transito'),
('Juan', 'López', 'transito3@example.com', 'juanlopez', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1990-07-23', '34567890', 'Avenida Real 789', 'transito'),
('María', 'Fernández', 'transito4@example.com', 'mariafernanda', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1992-09-10', '45678901', 'Calle Central 101', 'transito'),
('Luis', 'Martínez', 'transito5@example.com', 'luismartines', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1995-11-15', '56789012', 'Calle Luna 202', 'transito');

-- Inserción del desarrollador
INSERT INTO usuarios (first_name, last_name, email, user, password, birth_date, dni, address, user_type)
VALUES 
('Facundo', 'Albano', '39500455@terciariourquiza.edu.ar', 'eldonqu', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1996-08-14', '39500455', 'San Luis 3123, Rosario, Santa Fe, Argentina', 'desarrollador');

-- Ver la tabla usuario
SELECT * FROM usuarios;

INSERT INTO reports (dni, description, address, city, province, latitude, longitude, image_url, report_status)
VALUES 
('12345678', 'Accidente de tránsito en la esquina', 'Calle Falsa 123', 'Rosario', 'Santa Fe', -32.944242, -60.650539, 'imagen_accidente.jpg', 'activo'),
('23456789', 'Semáforo roto', 'Avenida Siempre Viva 742', 'Córdoba', 'Córdoba', -31.4135, -64.18105, 'imagen_semaforo.jpg', 'activo'),
('34567890', 'Inundación en la calle principal', 'Calle 12 de Octubre 123', 'Buenos Aires', 'Buenos Aires', -34.61315, -58.37723, 'imagen_inundacion.jpg', 'activo'),
('45678901', 'Choque múltiple en autopista', 'Autopista Rosario-Córdoba', 'Rosario', 'Santa Fe', -32.9586, -60.6835, 'imagen_choque.jpg', 'activo'),
('56789012', 'Manifestación en avenida', 'Avenida Pellegrini 345', 'Rosario', 'Santa Fe', -32.9573, -60.6497, 'imagen_manifestacion.jpg', 'activo'),
('12345678', 'Árbol caído bloqueando la calle', 'Calle Colón 789', 'Mendoza', 'Mendoza', -32.89084, -68.82717, 'imagen_arbol.jpg', 'activo'),
('23456789', 'Corte de luz en la zona', 'Calle Rivadavia 234', 'San Juan', 'San Juan', -31.5375, -68.53639, 'imagen_corte_luz.jpg', 'activo'),
('34567890', 'Colisión de colectivos', 'Calle Corrientes 456', 'Córdoba', 'Córdoba', -31.4201, -64.1888, 'imagen_colectivos.jpg', 'activo'),
('45678901', 'Gas en la vía pública', 'Avenida Libertador 123', 'Buenos Aires', 'Buenos Aires', -34.5942, -58.3906, 'imagen_gas.jpg', 'activo'),
('56789012', 'Fuga de agua', 'Calle San Martín 999', 'Rosario', 'Santa Fe', -32.94682, -60.6305, 'imagen_fuga_agua.jpg', 'activo');

SELECT * FROM reports;

INSERT INTO report_actions (report_id, dni, action)
VALUES 
(1, '34567890', 'confirmar'),
(1, '45678901', 'confirmar'),
(2, '56789012', 'completar'),
(3, '12345678', 'confirmar'),
(4, '23456789', 'confirmar'),
(5, '34567890', 'completar'),
(6, '45678901', 'confirmar'),
(7, '56789012', 'confirmar'),
(8, '12345678', 'completar'),
(9, '23456789', 'confirmar'),
(10, '34567890', 'completar');

SELECT * FROM report_actions;

INSERT INTO favorites (dni, latitude, longitude, address)
VALUES 
('12345678', -32.944242, -60.650539, 'Calle Falsa 123, Rosario, Santa Fe'),
('23456789', -31.4135, -64.18105, 'Avenida Siempre Viva 742, Córdoba, Córdoba'),
('34567890', -34.61315, -58.37723, 'Calle 12 de Octubre 123, Buenos Aires, Buenos Aires'),
('45678901', -32.9573, -60.6497, 'Avenida Pellegrini 345, Rosario, Santa Fe'),
('56789012', -32.89084, -68.82717, 'Calle Colón 789, Mendoza, Mendoza'),
('12345678', -31.5375, -68.53639, 'Calle Rivadavia 234, San Juan, San Juan'),
('23456789', -31.4201, -64.1888, 'Calle Corrientes 456, Córdoba, Córdoba'),
('34567890', -34.5942, -58.3906, 'Avenida Libertador 123, Buenos Aires, Buenos Aires'),
('45678901', -32.94682, -60.6305, 'Calle San Martín 999, Rosario, Santa Fe'),
('56789012', -32.9586, -60.6835, 'Autopista Rosario-Córdoba, Rosario, Santa Fe');

SELECT * FROM favorites;

INSERT INTO routes (dni, origin, destination, route_details)
VALUES 
('12345678', 'Calle Falsa 123, Rosario', 'Avenida Corrientes 123, Rosario', 'Ruta más rápida: 10 minutos, tráfico moderado'),
('23456789', 'Avenida Siempre Viva 742, Córdoba', 'Terminal de Ómnibus, Córdoba', 'Ruta más rápida: 15 minutos, tráfico liviano'),
('34567890', 'Calle 12 de Octubre 123, Buenos Aires', 'Plaza de Mayo, Buenos Aires', 'Ruta más rápida: 20 minutos, tráfico pesado'),
('45678901', 'Calle Rivadavia 234, San Juan', 'Parque de Mayo, San Juan', 'Ruta más rápida: 12 minutos, tráfico leve'),
('56789012', 'Calle Colón 789, Mendoza', 'Plaza Independencia, Mendoza', 'Ruta más rápida: 8 minutos, tráfico moderado'),
('12345678', 'Avenida Pellegrini 345, Rosario', 'Teatro El Círculo, Rosario', 'Ruta más rápida: 6 minutos, tráfico ligero'),
('23456789', 'Calle Corrientes 456, Córdoba', 'Estadio Kempes, Córdoba', 'Ruta más rápida: 15 minutos, tráfico pesado'),
('34567890', 'Avenida Libertador 123, Buenos Aires', 'Obelisco, Buenos Aires', 'Ruta más rápida: 12 minutos, tráfico denso'),
('45678901', 'Calle San Martín 999, Rosario', 'Parque España, Rosario', 'Ruta más rápida: 5 minutos, tráfico leve'),
('56789012', 'Autopista Rosario-Córdoba', 'Terminal de Ómnibus, Córdoba', 'Ruta más rápida: 25 minutos, tráfico moderado');


-- Eliminar un usuario por su ID (ejemplo)
DELETE FROM usuarios WHERE id = 2;

-- Vaciar la tabla sin eliminar la estructura
TRUNCATE TABLE usuarios;

-- Ver la versión de MySQL
SELECT VERSION();

-- Editar un registro
UPDATE usuarios
SET dni = '45500455'
WHERE id = 8;