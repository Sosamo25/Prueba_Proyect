import axios from 'axios';

class UsuariosService {

    async postUsers (id, documentType, Document, user, name, lastName, rol, pass, Title, titleArea) {
        return await axios.post('http://localhost:3001/users', 
        {
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
        })
    }


    async getUsers() {
        return await axios.get('http://localhost:3001/users');
    }

    async putUsers(id, nuevoid, documentType, Document, user, name, lastName, rol, pass, Title, titleArea) {
        return await axios.put('http://localhost:3001/users', 
        {
            id,
            nuevoid,
            documentType,
            Document,
            user,
            name,
            lastName,
            rol,
            pass,
            Title,
            titleArea,
        })
    }

    async deleteUsers(id) {
        return await axios.delete('http://localhost:3001/users', 
        {
            params: {
                id
            }
        }
        )
    }
}

export default new UsuariosService();