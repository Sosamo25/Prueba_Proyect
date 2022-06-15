

//Agregar usuario
exports.postUsers = (connection, req, res) => {
    let ID = req.body.ID;
    let correoInstitucional = req.body.correoInstitucional;
    let password = req.body.password;
    let tipoDocumento = req.body.tipoDocumento;
    let numDocumento = req.body.numDocumento;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let cargo = req.body.cargo;
    let areaCargo = req.body.areaCargo;
    let perfilCargo = req.body.perfilCargo;


    connection.query('INSERT INTO Usuario_Funcionario (ID, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo)' +
    'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        ID, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo
    ], (err, results, fields) =>{
        if (err) {
            res.status(500).send('Ocurrio un error')
        } else {
            res.status(200).send(results);
        }
    })
}



//Obtener todos usuarios
exports.getUsers = (connection, req, res) => {
    connection.query('SELECT * FROM Usuario_Funcionario', 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrió un error al intentar obtener todos los usuarios');
        } else {
            let usersArreglo = [];

            for (let i = 0; i < results.length; i++) {
                let ID = {
                    original: results[i].ID,
                    nuevo: results[i].ID
                };
                let correoInstitucional = results[i].correoInstitucional;
                let password = results[i].password;
                let tipoDocumento = results[i].tipoDocumento;
                let numDocumento = results[i].numDocumento;
                let nombre = results[i].nombre;
                let apellido = results[i].apellido;
                let cargo = results[i].cargo;
                let areaCargo = results[i].areaCargo;
                let perfilCargo = results[i].perfilCargo;


                usersArreglo.push({
                    ID,
                    correoInstitucional,
                    password,
                    tipoDocumento,
                    numDocumento,
                    nombre,
                    apellido,
                    cargo,
                    areaCargo,
                    perfilCargo
                });
            }

            res.status(200).send(usersArreglo);
        }
    })
}

//Actualizar Usuarios
exports.putUsers = (connection, req, res) => {
    let ID = req.body.ID;
    let nuevoid = req.body.nuevoid;
    let correoInstitucional = req.body.correoInstitucional;
    let password = req.body.password;
    let tipoDocumento = req.body.tipoDocumento;
    let numDocumento = req.body.numDocumento;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let cargo = req.body.cargo;
    let areaCargo = req.body.areaCargo;
    let perfilCargo = req.body.perfilCargo;

    connection.query('UPDATE Usuario_Funcionario SET ID = ?, correoInstitucional = ?, password = ?, tipoDocumento = ?, numDocumento = ?, nombre = ?, apellido = ?, cargo = ?, areaCargo = ?, perfilCargo = ? WHERE ID = ?'
    , [
        nuevoid, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo, ID
    ], (err, results, fields) => {
        if (err) {
            res.status(500).send('Ocurrió un error al intentar actualizar los usuarios.');
        } else {
            res.status(200).send(results);
        }
    })

}

exports.deleteUsers = (connection, req, res) => {
    let ID = req.query.ID;

    connection.query('DELETE FROM Usuario_Funcionario WHERE ID = ?', [ID], 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error al intentar eliminar un usuario');
        } else {
            res.status(200).send(results);
        }
    })
}