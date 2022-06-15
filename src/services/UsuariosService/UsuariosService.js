import axios from 'axios';

class UsuariosService {

    async postUsers (ID, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo) {
        return await axios.post('http://localhost:3001/users', 
        {
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
        })
        
    }


    async getUsers() {
        return await axios.get('http://localhost:3001/users')
    }

    async putUsers(ID, nuevoid, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo) {
        return await axios.put('http://localhost:3001/users', 
        {
            ID,
            nuevoid,
            correoInstitucional,
            password,
            tipoDocumento,
            numDocumento,
            nombre,
            apellido,
            cargo,
            areaCargo,
            perfilCargo
        })
    }

    async deleteUsers(ID) {
        return await axios.delete('http://localhost:3001/users', 
        {
            params: {
                ID
            }
        }
        )
    }
}

export default new UsuariosService();