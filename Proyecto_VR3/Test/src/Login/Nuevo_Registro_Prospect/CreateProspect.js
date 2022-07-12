import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../CSS/Formularios.css';
import '../CSS/Crear_objetos.css';

const URI = 'http://localhost:5000/usuario_prospecto/'


const CompCreateProspects = () => {
    const [ tipoDocumento, settipoDocumento] = useState('')
    const [ nombre, setnombre] = useState('')
    const [ apellido, setapellido ] = useState('')
    const [ gradoEscolar, setgradoEscolar ] = useState('')
    const [ carreraInteres, setcarreraInteres ] = useState('')
    const [ carreraInteres2, setcarreraInteres2 ] = useState('')
    const [ colegio, setcolegio ] = useState('')
    const [ correoElectronico, setcorreoElectronico ] = useState('')
    const [ telefono, settelefono ] = useState('')
    const [ autorizacion, setautorizacion ] = useState('')
    const [ codigoDaneColegio, setcodigoDaneColegio ] = useState('')

    //procedimiento guardar
    const GuardarProspect = async (e) => {
        e.preventDefault()
        await axios.post(URI, {
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
            codigoDaneColegio: codigoDaneColegio
        })
        Navigate('')
        
    }

    return (
        <div className="register-form">
            <h1 className="Registrar_font">Registro</h1>

            <form onSubmit={GuardarProspect} class="Registrar_font">
                
                <div className='mb-3'>
                    <label className='form-label'>* Numero de Documento </label>
                    <input value={tipoDocumento} onChange={ (e) => settipoDocumento(e.target.value) }
                        type="number"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Nombres </label>
                    <input value={nombre} onChange={ (e) => setnombre(e.target.value) }
                        type="text"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Apellidos </label>
                    <input value={apellido} onChange={ (e) => setapellido(e.target.value) }
                        type="text"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Grado Escolar </label>
                    <select id="gradoEscolar" name="tipoDocumento" class="select-css" tabIndex="1"
                        value={gradoEscolar}
                        onChange={ (e) => setgradoEscolar(e.target.value) }
                        type="text"
                        className='form-control'
                        required>
                            <option disabled>Elige una opción</option>
                            <option value="9" >Noveno Grado</option>
                            <option value="10">Decimo Grado</option>
                            <option value="11">Decimoprimer Grado</option>
                            <option value="12">Decimosegundo Grado</option>
                        </select>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Carrera de Interes 1</label>
                    <input value={carreraInteres} onChange={ (e) => setcarreraInteres(e.target.value) }
                        type="text"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Carrera de Interes 2</label>
                    <input value={carreraInteres2} onChange={ (e) => setcarreraInteres2(e.target.value) }
                        type="text"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Colegio </label>
                    <input value={colegio} onChange={ (e) => setcolegio(e.target.value) }
                        type="text"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                     <label className='form-label'>* Correo Electronico</label>
                    <input
                        value={correoElectronico}
                        onChange={ (e)=> setcorreoElectronico(e.target.value)} 
                        type="email"
                        className='form-control'
                        required 
                        tabindex="4" 
                        autofocus
                    />                 
                 </div>

                 <div className='mb-3'>
                    <label className='form-label'>* Telefono </label>
                    <input value={telefono} onChange={ (e) => settelefono(e.target.value) }
                        type="number"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>* Codigo Dane </label>
                    <input value={codigoDaneColegio} onChange={ (e) => setcodigoDaneColegio(e.target.value) }
                        type="number"
                        className='form-control'
                        minLength="5" 
                        maxLength="30"
                        required 
                        tabIndex="2" 
                        autoFocus
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'> Permite la autorización de tus datos </label>
                    <select id="autorizacion" name="autorizacion" class="select-css" tabIndex="1"
                        value={autorizacion}
                        onChange={ (e) => setautorizacion(e.target.value) }
                        type="text"
                        className='form-control'
                        required>

                            <option disabled>Elige una opción</option>
                            <option value="1" >SI</option>
                            <option value="2">NO</option>

                        </select>
                </div>

                <button type='submit' class="btn-register">Guardar</button>

                <a href="/" class="btn-Cancelar">Cancelar</a>

            </form>
        </div>
    )
}

export default CompCreateProspects