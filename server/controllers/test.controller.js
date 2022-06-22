

//Agregar 
exports.postTest = (connection, req, res) => {

    const  generateRandomString = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= Math.random().toString(36).substring(0,num);       

        return result1;
    }

    let codigoUnico = generateRandomString;
    let nombreTest = req.body.nombreTest;
    let ciudad = req.body.ciudad;
    let colegio = req.body.colegio;
    let estado = req.body.estado;

    connection.query('INSERT INTO test (codigoUnico, nombreTest, ciudad, colegio, estado)' + 
    'VALUES (?, ?, ?, ?, ?)', [
        codigoUnico, nombreTest, ciudad, colegio, estado
    ], (err, results, fields) => {
        if (err) {
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
                let codigoUnico = results[i].codigoUnico;
                let nombreTest = results[i].nombreTest;
                let ciudad = results[i].ciudad;
                let colegio = results[i].colegio;
                let estado = results[i].estado;


                testArreglo.push({
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