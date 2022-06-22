module.exports = (app, connection) => {

const cUsers = require('../controllers/users.controller.js');


app.route('/users')


// Obtener todos los usuarios
.get((req, res)=> {
    cUsers.getUsers(connection, req, res);
})

// Crear usuarios
.post((req, res) => {
    cUsers.postUsers(connection, req, res);
})

//Actualizar usuarios
.put((req, res) => {
    cUsers.putUsers(connection, req, res);
})

.delete((req, res) => {
    cUsers.deleteUsers(connection, req, res);
})

app.route('users-password')





}