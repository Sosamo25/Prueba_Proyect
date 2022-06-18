
//Agregar Programa
exports.postPrograma = (connection, req, res) => {
    let numConsecutivo = req.body.numConsecutivo;
    let nombre = req.body.nombre;
    let ciclo = req.body.ciclo;
    let verbal = req.body.verbal;
    let matematico = req.body.matematico;
    let visualEspacial = req.body.visualEspacial; 
    let kinesico = req.body.kinesico; 
    let musical = req.body.musical;
    let intrapersonal = req.body.intrapersonal;
    let interpersonal = req.body.interpersonal;
    let naturalista = req.body.naturalista;
    let pertenceUAO = req.body.pertenceUAO;


    connection.query('INSERT INTO programa_academico (numConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO)' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        numConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO
    ], (err, results, fields) =>{
        if (err) {
            res.status(500).send('Ocurrio un error');
        } else {
            res.status(200).send(results);
        }
    })
}


//Obtener todos los programas 
exports.getPrograma = (connection, req, res) => {
    connection.query('SELECT * FROM programa_academico',
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrió un error al intentar obtener todos los programas');
        } else {
            let programaArreglo = [];

            for (let i = 0; i < results.length; i++) {
                let numConsecutivo = {
                    original: results[i].numConsecutivo,
                    nuevo: results[i].numConsecutivo
                };
                let nombre = results[i].nombre;
                let ciclo = results[i].ciclo;
                let verbal = results[i].verbal;
                let matematico = results[i].matematico;
                let visualEspacial = results[i].visualEspacial;
                let kinesico = results[i].kinesico;
                let musical = results[i].musical;
                let intrapersonal = results[i].intrapersonal;
                let interpersonal = results[i].interpersonal;
                let naturalista = results[i].naturalista;
                let pertenceUAO = results[i].pertenceUAO;

                programaArreglo.push({
                    numConsecutivo,
                    nombre,
                    ciclo,
                    verbal,
                    matematico,
                    visualEspacial,
                    kinesico,
                    musical,
                    intrapersonal,
                    interpersonal,
                    naturalista,
                    pertenceUAO
                });
            }

            res.status(200).send(programaArreglo);
        }
    })
}



//Actualizar programa
exports.putPrograma = (connection, req, res) => {
    let numConsecutivo = req.body.numConsecutivo;
    let nuevoConsecutivo = req.body.nuevoConsecutivo;
    let nombre = req.body.nombre;
    let ciclo = req.body.ciclo;
    let verbal = req.body.verbal;
    let matematico = req.body.matematico;
    let visualEspacial = req.body.visualEspacial; 
    let kinesico = req.body.kinesico;
    let musical = req.body.musical;
    let intrapersonal = req.body.intrapersonal;
    let interpersonal = req.body.interpersonal;
    let naturalista = req.body.naturalista;
    let pertenceUAO = req.body.pertenceUAO;

    connection.query('UPDATE programa_academico SET numConsecutivo = ?, nombre = ?, ciclo = ?, verbal = ?, matematico = ?, visualEspacial = ?, kinesico = ?, musical = ?, intrapersonal = ?, interpersonal = ?, naturalista = ?, pertenceUAO = ? WHERE numConsecutivo = ? '
    , [
        nuevoConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO, numConsecutivo
    ], (err, results, fields) => {
        if (err) {
            res.status(500).send('Ocurrió un error al intentar actualizar los programas.');
        } else {
            res.status(200).send(results);
        }
    })
}

exports.deletePrograma = (connection, req, res) => {
    let numConsecutivo = req.query.numConsecutivo;

    connection.query('DELETE FROM programa_academico WHERE numConsecutivo = ?', [numConsecutivo], 
    (err, results, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ocurrio un error al intentar eliminar un programa ');
        } else {
            res.status(200).send(results);
        }
    })
}