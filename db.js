const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',     // Cambia esto si tu base de datos no está en localhost
  user: 'root',    // Reemplaza con tu usuario de MySQL
  password: '',   // Reemplaza con tu contraseña de MySQL
  database: 'proyecto_qr'   // Reemplaza con el nombre de tu base de datos
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

module.exports = connection;
