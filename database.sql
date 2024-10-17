CREATE DATABASE IF NOT EXISTS canva_licenses;
USE canva_licenses;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  celular VARCHAR(20) NOT NULL,
  periodo_contrato INT NOT NULL,
  etiquetas TEXT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un usuario de prueba (la contraseña es "password")
INSERT INTO usuarios (email, password) VALUES ('admin@example.com', '$2a$10$mLK.rrdlvx9DCFb6Eck1t.TlltnGulepXnov3bBp5T2TloO1MYj52');

-- Insertar algunos clientes de prueba
INSERT INTO clientes (nombres, apellidos, email, celular, periodo_contrato, etiquetas) VALUES
('Juan', 'Pérez', 'juan@example.com', '987654321', 1, 'nuevo,diseñador'),
('María', 'García', 'maria@example.com', '987654322', 12, 'fidelizado,marketing'),
('Carlos', 'López', 'carlos@example.com', '987654323', 6, 'empresa,diseño');