const mysql = require('mysql2'); // Importamos mysql2 para conectar a la base de datos
const dotenv = require('dotenv'); // Importamos dotenv para manejar variables de entorno

dotenv.config(); // Cargamos las variables de entorno desde .env

// Creamos la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectamos a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db; // Exportamos la conexión para usarla en otros archivos
