module.exports = (app, connection) => {
    

const cProgramas = require('../controllers/programas.controller.js');



app.route('/programas')

//Obtener todos los programas
.get((req, res) =>{
    cProgramas.getPrograma(connection, req, res);
})

//Crear programa
.post((req, res) =>{
    cProgramas.postPrograma(connection, req, res);
})

//Actualizar
.put((req, res) =>{
    cProgramas.putPrograma(connection, req, res);
})

//Eliminar
.delete((req, res) =>{
    cProgramas.deletePrograma(connection, req, res);
})
}