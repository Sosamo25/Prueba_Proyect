

//Agregar Colegio
exports.postColegio = (connection, req, res) => {
    let codigoDane = req.body.codigoDane;
    let nombre = req.body.nombre;
    let clasificacion = req.body.clasificacion;
    let ciudad = req.body.ciudad;
    let correoInstitucional = req.body.correoInstitucional;
    let numeroTelefono = req.body.numeroTelefono;
    let nombreRepresentante = req.body.nombreRepresentante;


    connection.query('INSERT INTO colegio (codigoDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante )' +
    'VALUES (?,?,?,?,?,?,?)', [
        codigoDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante
    ], (err, results, fields) =>{
        if (err) {
            res.status(500).send('Ocurrio un error');
        } else {
            res.status(200).send(results);
        }
    })
}



//Obtener todos los colegios
exports.getColegio = (connection, req, res) => {
    connection.query('SELECT * FROM colegio',
    (err, results, fields) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrió un error al intentar obtener todos los colegios');
        } else {
            let colegioArreglo = [];

            for (let i = 0; i < results.length; i++) {
                let codigoDane = {
                    original: results[i].codigoDane,
                    nuevo: results[i].codigoDane
                };
                let nombre = results[i].nombre;
                let clasificacion = results[i].clasificacion;
                let ciudad = results[i].ciudad;
                let correoInstitucional = results[i].correoInstitucional;
                let numeroTelefono = results[i].numeroTelefono;
                let nombreRepresentante = results[i].nombreRepresentante;


                colegioArreglo.push({
                    codigoDane,
                    nombre,
                    clasificacion,
                    ciudad,
                    correoInstitucional,
                    numeroTelefono,
                    nombreRepresentante
                });

            }

            res.status(200).send(colegioArreglo);

        }
    })
}


//Actualizar colegio
exports.putColegio = (connection, req, res) => {
    let codigoDane = req.body.codigoDane;
    let nuevocodDane = req.body.nuevocodDane;
    let nombre = req.body.nombre;
    let clasificacion = req.body.clasificacion;
    let ciudad = req.body.ciudad;
    let correoInstitucional = req.body.correoInstitucional;
    let numeroTelefono = req.body.numeroTelefono;
    let nombreRepresentante = req.body.nombreRepresentante;

    connection.query('UPDATE colegio SET codigoDane = ?, nombre = ?, clasificacion = ?, ciudad = ?, correoInstitucional = ?, numeroTelefono = ?, nombreRepresentante = ? WHERE codigoDane = ? '
    , [
        nuevocodDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante, codigoDane
    ], (err, results, fields) => {
        if (err) {
            res.status(500).send('Ocurrió un error al intentar actualizar los colegios.');
        } else {
            res.status(200).send(results);
        }
    })
}

exports.deleteColegio = (connection, req, res) => {
    let codigoDane = req.query.codigoDane;

    connection.query('DELETE FROM colegio WHERE codigoDane = ?', [codigoDane], 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error al intentar eliminar un colegio');
        } else {
            res.status(200).send(results);
        }
    })
}