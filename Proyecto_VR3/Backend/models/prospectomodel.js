//importamos la conexión a la DB
import db from "../config/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const prospectomodel = db.define('Usuario_Prospecto', {
    tipoDocumento: {type: DataTypes.STRING},
    nombre: {type: DataTypes.STRING},
    apellido: {type: DataTypes.STRING},
    gradoEscolar: {type: DataTypes.STRING},
    carreraInteres: {type: DataTypes.STRING},
    carreraInteres2: {type: DataTypes.STRING},
    colegio: {type: DataTypes.STRING},
    correoElectronico: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING},
    autorizacion: {type: DataTypes.STRING},
    codigoDaneColegio: {type: DataTypes.STRING},
})

export default prospectomodel