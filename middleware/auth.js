const jwt = require('jsonwebtoken'); // Importamos jsonwebtoken para crear y verificar tokens

// Middleware para proteger rutas que requieren autenticación
const auth = (req, res, next) => {
    const token = req.header('Authorization'); // Obtenemos el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' }); // Si no hay token, retornamos un error
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token
        req.user = verified; // Guardamos la información del usuario en la solicitud
        next(); // Pasamos al siguiente middleware o ruta
    } catch (err) {
        res.status(400).json({ message: 'Token inválido' }); // Si el token es inválido, retornamos un error
    }
};

module.exports = auth; // Exportamos el middleware
