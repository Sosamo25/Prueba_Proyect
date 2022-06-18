import axios from 'axios';


class ColegiosService {

    async postColegios (codigoDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante) {
        return await axios.post('http://localhost:3001/colegios',
        {
            codigoDane,
            nombre,
            clasificacion,
            ciudad,
            correoInstitucional,
            numeroTelefono,
            nombreRepresentante
        })
    }


    async getColegios() {
        return await axios.get('http://localhost:3001/colegios')
    }

    async putColegios(codigoDane, nuevocodDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante) {
        return await axios.put('http://localhost:3001/colegios',
        {
            codigoDane,
            nuevocodDane,
            nombre,
            clasificacion,
            ciudad,
            correoInstitucional,
            numeroTelefono,
            nombreRepresentante
        })
    }


    async deleteColegios(codigoDane) {
        return await axios.delete('http://localhost:3001/colegios',
        {
            params: {
                codigoDane
            }
        })
    }
}

export default new ColegiosService();