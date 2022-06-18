import axios from "axios";


class ProgramasService {

    async postProgramas (numConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO){
        return await axios.post('http://localhost:3001/programas',
        {
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
        })
    }


   async getProgramas() {
    return await axios.get('http://localhost:3001/programas')
   }

    async putProgramas(numConsecutivo, nuevoConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO) {
        return await axios.put('http://localhost:3001/programas',
        {
            numConsecutivo,
            nuevoConsecutivo,
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
        })
    }


    async deleteProgramas(numConsecutivo) {
        return await axios.delete('http://localhost:3001/programas',
        {
            params: {
                numConsecutivo
            }
        })
    }
}

export default new ProgramasService();