import axios from 'axios';


class TestService {

    async postTest (codigoUnico, nombreTest, ciudad, colegio, estado){
        return await axios.post('http://localhost:3001/test',
        {
            codigoUnico,
            nombreTest,
            ciudad,
            colegio,
            estado
        })
    }


    async getTest() {
        return await axios.get('http://localhost:3001/test')
    }


    async putTest(nombreTest, ciudad, colegio, estado, codigoUnico) {
        return await axios.put('http://localhost:3001/test',
        {
            nombreTest,
            ciudad,
            colegio,
            estado,
            codigoUnico
        })
    }

    async deleteTest(codigoUnico) {
        return await axios.delete('http://localhost:3001/test',
        {
            params: {
                codigoUnico
            }
        })
    }
}

export default new TestService();