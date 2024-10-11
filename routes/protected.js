const express = require('express'); // Importamos express
const auth = require('../middleware/auth'); // Importamos el middleware de autenticación
const router = express.Router(); // Creamos un router

// Ruta protegida
router.get('/protected', auth, (req, res) => {
    res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user }); // Respuesta si el token es válido
});

module.exports = router; // Exportamos el router
