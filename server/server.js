// Importando librerías necesarias
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

//Importar rutas
const rUsers = require('./routes/users.routes.js');
const rColegio = require('./routes/colegio.routes.js');
const rPrograma = require('./routes/programas.routes.js');
const rTest = require('./routes/test.routes.js');





// Verificando conexión de mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'InteligenciasMultiples'
});

connection.connect(err => {
    if (err) {
        console.log('Ocurrió un error al intentar conectarse a la base de datos.');
        console.log(err.stack);
    }
});

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
rUsers(app, connection);
rColegio(app, connection);
rPrograma(app, connection);
rTest(app, connection);




// Iniciando el servidor
app.listen(3001, () => {
    console.log('Server on port 3001')
})