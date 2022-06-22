module.exports = (app, connection) => {

    const cUsers = require('../controllers/users.controller.js');


    app.route('/users')

    //Iniciar sesion 
    .get((req, res) => {
        cUsers.logIn(connection, req, res);
    })

    //Obtener contrasena
    .get((req, res) => {
        cUsers.getContrasena(connection, req, res);
    })



}