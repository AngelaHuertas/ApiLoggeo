const express = require('express'); // Importamos express
const router = express.Router(); // Creamos un router
const { register, login } = require('../controllers/authController'); // Importamos las funciones del controlador

// Ruta para registrar un usuario
router.post('/register', register); // Asociamos el controlador de registro a la ruta

// Ruta para loguear un usuario
router.post('/login', login); // Asociamos el controlador de login a la ruta

module.exports = router; // Exportamos las rutas
