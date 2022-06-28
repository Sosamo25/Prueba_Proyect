

//Agregar 
exports.postTest = (connection, req, res) => {

    let fechaDeCreacion = req.body.fechaDeCreacion;
    let codigoUnico = req.body.codigoUnico;
    let nombreTest = req.body.nombreTest;
    let ciudad = req.body.ciudad;
    let colegio = req.body.colegio;
    let estado = req.body.estado;

    connection.query('INSERT INTO Test (fechaDeCreacion, codigoUnico, nombreTest, ciudad, colegio, estado)' + 
    'VALUES (?, ?, ?, ?, ?, ?)', [
        fechaDeCreacion, codigoUnico, nombreTest, ciudad, colegio, estado
    ], (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error')
        } else {
            res.status(200).send(results);
        }
    })
}


//Obtener todos test
exports.getTest = (connection, req, res) => {
    connection.query('SELECT * FROM test',
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrió un error al intentar obtener todos los usuarios');
        } else {
            let testArreglo = [];

            for (let i = 0; i < results.length; i++) {
                let fechaDeCreacion = results[i].fechaDeCreacion;
                let codigoUnico = results[i].codigoUnico;
                let nombreTest = results[i].nombreTest;
                let ciudad = results[i].ciudad;
                let colegio = results[i].colegio;
                let estado = results[i].estado;


                testArreglo.push({
                    fechaDeCreacion,
                    codigoUnico,
                    nombreTest,
                    ciudad,
                    colegio,
                    estado
                });
            }
            
            res.status(200).send(testArreglo);
        }
    })
}



//Actualizar Test
exports.putTest = (connection, req, res) => {
    let codigoUnico = req.body.codigoUnico;
    let nombreTest = req.body.nombreTest;
    let ciudad = req.body.ciudad;
    let colegio = req.body.colegio;
    let estado = req.body.estado

    connection.query('UPDATE test SET nombreTest = ?, ciudad = ?, colegio = ?, estado = ? WHERE codigoUnico = ?'
    , [
        nombreTest, ciudad, colegio, estado, codigoUnico
    ], (err, results, fields) => {
        if (err) {
            res.status(500).send('Ocurrio un error al intentar actualizar los test');
        } else {
            res.status(200).send(results);
        }
    })
}

exports.deleteTest = (connection, req, res) => {
    let codigoUnico = req.query.codigoUnico;

    connection.query('DELETE FROM test WHERE codigoUnico = ?', [codigoUnico], 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error al intentar eliminar un test')
        } else {
            res.status(200).send(results);
        }
    })
}