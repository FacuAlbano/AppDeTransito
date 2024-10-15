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

SELECT VERSION()