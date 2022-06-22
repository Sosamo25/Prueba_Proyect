module.exports = (app, connection) => {
    
    const cTest = require('../controllers/test.controller.js');


    app.route('/test')

    //Obtener todos
    .get((req, res) => {
        cTest.getTest(connection, req, res);
    })

    //Crear
    .post((req, res) => {
        cTest.postTest(connection, req, res);
    })

    //Actualizar
    .put((req, res) => {
        cTest.putTest(connection, req, res);
    })

    //Eliminar
    .delete((req, res) => {
        cTest.deleteTest(connection, req, res);
    })
}