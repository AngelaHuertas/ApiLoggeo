const express = require('express'); // Importamos express
const helmet = require('helmet'); // Importamos helmet para seguridad
const authRoutes = require('./routes/auth'); // Importamos las rutas de autenticación
const protectedRoutes = require('./routes/protected');
const dotenv = require('dotenv'); // Importamos dotenv

dotenv.config(); // Cargamos las variables de entorno

const app = express(); // Creamos una instancia de express
app.use(helmet()); // Usamos helmet para aumentar la seguridad
app.use(express.json()); // Habilitamos el parseo de JSON en las solicitudes

app.use('/api/auth', authRoutes); // Usamos las rutas de autenticación
app.use('/api', protectedRoutes); 

// Iniciamos el servidor
const PORT = process.env.PORT || 5000; // Definimos el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje en consola al iniciar
});
