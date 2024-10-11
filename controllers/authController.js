const db = require('../config/db'); // Importamos la conexión a la base de datos
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Importamos jsonwebtoken para manejar tokens

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    const { username, password } = req.body; // Desestructuramos el cuerpo de la solicitud

    // Validamos que los campos no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos' });
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña con un costo de 10

    // Insertamos el nuevo usuario en la base de datos
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
    });
};

// Función para loguear un usuario
const login = async (req, res) => {
    const { username, password } = req.body; // Desestructuramos el cuerpo de la solicitud

    // Buscamos al usuario en la base de datos
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario', error: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' }); // Usuario no encontrado
        }

        const user = results[0]; // Obtenemos el primer resultado

        // Comparamos la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password); // Comparamos contraseñas

        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' }); // Contraseña incorrecta
        }

        // Creamos un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Firmamos el token

        res.json({ token }); // Retornamos el token al cliente
    });
};

module.exports = { register, login }; // Exportamos las funciones
