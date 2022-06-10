

//Agregar usuario
exports.postUsers = (connection, req, res) => {
    let id = req.body.id;
    let documentType = req.body.documentType;
    let Document = req.body.Document;
    let user = req.body.user;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let rol = req.body.rol;
    let pass = req.body.pass;
    let Title = req.body.Title;
    let titleArea = req.body.titleArea;


    connection.query('INSERT INTO users(id, documentType, Document, user, name, lastName, rol, pass, Title, titleArea)' +
    'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id, documentType, Document, user, name, lastName, rol, pass, Title, titleArea
    ], (err, results, fields) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error')
        } else {
            res.status(200).send(results);
        }
    })
}



//Obtener todos usuarios
exports.getUsers = (connection, req, res) => {
    connection.query('SELECT * FROM users', 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrió un error al intentar obtener todos los usuarios');
        } else {
            let usersArreglo = [];

            for (let i = 0; i < results.length; i++) {
                let id = {
                    original: results[i].id,
                    nuevo: results[i].id
                };
                let documentType = results[i].documentType;
                let Document = results[i].Document;
                let user = results[i].user;
                let name = results[i].name;
                let lastName = results[i].lastName;
                let rol = results[i].rol;
                let pass = results[i].pass;
                let Title = results[i].Title;
                let titleArea = results[i].titleArea;


                usersArreglo.push({
                    id,
                    documentType,
                    Document,
                    user,
                    name,
                    lastName,
                    rol,
                    pass,
                    Title,
                    titleArea
                });
            }

            res.status(200).send(usersArreglo);
        }
    })
}

//Actualizar Usuarios
exports.putUsers = (connection, req, res) => {
    let id = req.body.id;
    let nuevoid = req.body.nuevoid;
    let documentType = req.body.documentType;
    let Document = req.body.Document;
    let user = req.body.user;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let rol = req.body.rol;
    let pass = req.body.pass;
    let Title = req.body.Title;
    let titleArea = req.body.titleArea;

    connection.query('UPDATE users SET id = ?, documentType = ?, Document = ?, user = ?, name = ?, lastName = ?, rol = ?, pass = ?, Title = ?, titleArea = ? WHERE id = ?'
    , [
        nuevoid, documentType, Document, user, name, lastName, rol, pass, Title, titleArea, id
    ], (err, results, fields) => {
        if (err) {
            res.status(500).send('Ocurrió un error al intentar actualizar los trabajadores.');
        } else {
            res.status(200).send(results);
        }
    })

}

exports.deleteUsers = (connection, req, res) => {
    let id = req.query.id;

    connection.query('DELETE FROM users WHERE id = ?', [id], 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error al intentar eliminar un usuario');
        } else {
            res.status(200).send(results);
        }
    })
}