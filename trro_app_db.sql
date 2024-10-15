USE trro_app_db;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    dni VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    user_type ENUM('menor_16', 'mayor_16', 'transito', 'desarrollador') NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users
ADD COLUMN nombre VARCHAR(255) NOT NULL AFTER email,
ADD COLUMN apellido VARCHAR(255) NOT NULL AFTER nombre;
ALTER TABLE users
CHANGE nombre first_name VARCHAR(255),
CHANGE apellido last_name VARCHAR(255);


INSERT INTO users (email, password, birth_date, dni, address, user_type, first_name, last_name)
VALUES 
('transito1@example.com', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1985-03-21', '12345678', 'Calle Falsa 123', 'transito', 'Carlos', 'Pérez'),
('transito2@example.com', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1987-05-11', '23456789', 'Calle Verdadera 456', 'transito', 'Ana', 'García'),
('transito3@example.com', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1990-07-23', '34567890', 'Avenida Real 789', 'transito', 'Juan', 'López'),
('transito4@example.com', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1992-09-10', '45678901', 'Calle Central 101', 'transito', 'María', 'Fernández'),
('transito5@example.com', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1995-11-15', '56789012', 'Calle Luna 202', 'transito', 'Luis', 'Martínez');
INSERT INTO users (email, password, birth_date, dni, address, user_type, first_name, last_name)
VALUES 
('39500455@terciariourquiza.edu.ar', '$2b$10$J1Kf0Z5zXtJ7G6FS9zRW0eUI8peJ2jR0i.K93fiNO/BSxrXo94MYC', '1996-08-14', '39500455', 'San Luis 3123, Rosario, Santa Fe, Argentina', 'desarrollador','Facundo','Albano');

USE trro_app_db;
SELECT * FROM users;
DELETE FROM users
WHERE id = 2;

SELECT VERSION()