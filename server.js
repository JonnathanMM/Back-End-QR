const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Resto de la configuración del servidor
// Configura las opciones del servidor HTTPS
const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.pem')
};

// Configura las rutas
app.use('/api', routes);

// Puerto en el que se ejecutará el servidor
const port = 3000;

// Inicia el servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Servidor escuchando en https://localhost:${port}`);
});
