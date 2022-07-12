//importamos el Modelo
import prospectomodel from "../models/prospectomodel.js"


//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllProspects = async (req, res) => {
    try {
        const prospectos = await prospectomodel.findAll()
        res.json(prospectos)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un registro
export const getProspect = async (req, res) => {
    try {
        const prospecto = await prospectomodel.findAll({
            where: { ID:req.params.ID }
        })
        res.json(prospecto[0])
    }catch (error) {
        res.json( {message: error.message} )
    }
}
//Crear un registro
export const createProspect = async (req, res) => {
    try {
        const {tipoDocumento, nombre, apellido, gradoEscolar, carreraInteres, carreraInteres2, colegio, correoElectronico, telefono, autorizacion, codigoDaneColegio,} = req.body;
        
            prospectomodel.create({
                tipoDocumento: tipoDocumento,
                nombre: nombre,
                apellido: apellido,
                gradoEscolar: gradoEscolar,
                carreraInteres: carreraInteres,
                carreraInteres2: carreraInteres2,
                colegio: colegio,
                correoElectronico: correoElectronico,
                telefono: telefono,
                autorizacion: autorizacion,
                codigoDaneColegio: codigoDaneColegio,
            });
            res.json("Registro creado de manera exitosa");
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Actualizar un registro
export const updateProspect = async (req, res) => {
    try {
            await prospectomodel.update(req.body, {
                where: { ID: req.params.ID}
            })
            res.json({
                "message":"¡Registro actualizado correctamente!"
            })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Eliminar un registro
export const deleteProspect = async (req, res) => {
    try {
        await prospectomodel.destroy({
            where: { ID: req.params.ID }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}