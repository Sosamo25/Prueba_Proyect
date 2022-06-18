module.exports = (app, connection) => {

const cColegio = require('../controllers/colegio.controller.js');


app.route('/colegios')

// Obtener todos los colegios
.get((req, res)=> {
    cColegio.getColegio(connection, req, res);
})

// Crear colegios
.post((req, res) => {
    cColegio.postColegio(connection, req, res);
})

//Actualizar colegios
.put((req, res) => {
    cColegio.putColegio(connection, req, res);
})

//Eliminar colegio
.delete((req, res) => {
    cColegio.deleteColegio(connection, req, res);
})


}