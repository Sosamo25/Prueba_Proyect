import React, { useState } from 'react';
import styles from './Login.css';
import { useNavigate } from 'react-router-dom';

//Services
import UsuariosService from '../../services/UsuariosService/UsuariosService.js';




const Login = (props) => {
    
    
    const [correoInstitucional, setCorreoInstitucional] = useState();
    const [password, setPassword] = useState();

    function handleCorreoInstitucional(e) {
        setCorreoInstitucional(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();
    function iniciarSesion(e) {

        //Evita que se recargue la pagina 
        e.preventDefault();

        UsuariosService.LogIn(correoInstitucional, password)
            .then((datos) => {

                if (datos.data.login) {
                    let cargo = datos.data.cargo;
                    


                    switch(cargo) {
                        case 'Admin':
                            navigate('/users');
                            break;

                        case 'Evaluador':
                            navigate('/colegios');
                            break;

                        default:
                    }
                } else {
                    alert('Correo o contraseña incorrecto.');
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Ocurrio un error al intentar iniciar sesión.')
            })
    }

    

    return (
        <div className={styles.Login}>

            <div className={styles.ContenedorFormularioInciarSesion}>
            <form>
          <input name="correo" id="correoInstitucional" placeholder="Correo electrónico" type="text" autoComplete="off" onChange={handleCorreoInstitucional} />
          <input name="contrasena" id="password" type="password" placeholder="************" onChange={handlePassword} />

          <div>
            <button onClick={iniciarSesion}>Iniciar sesión</button>
            <button>Olvidé mi contraseña</button>
          </div>
        </form>
            </div>
            
        </div>
    )};

    Login.propTypes = {};

    Login.defaultProps = {};

    export default Login;