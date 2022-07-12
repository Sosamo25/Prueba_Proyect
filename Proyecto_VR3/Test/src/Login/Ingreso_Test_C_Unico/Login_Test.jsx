import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import "./Login_Test.css";



const Login_Test = () => {
    const [inputs, setInputs] = useState({ correoElectronico: "", tipoDocumento: "" });
    const [mensaje, setMensaje] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const { correoElectronico, tipoDocumento } = inputs;

    const HandleChange = (e) => {
        setInputs({ ...this.inputs, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (correoElectronico !== "" && tipoDocumento !== "") {
            const Usuario_Prospecto = {
                correoElectronico,
                tipoDocumento,
            };
            setLoading(true);
            await axios
                .post("http://localhost:5000/usuario_prospecto/login", Usuario_Prospecto)
                .then((res) => {
                    const { data } = res;
                    setMensaje(data.mensaje);
                })
                .catch((error) => {
                    console.error(error);
                    alert("Hubo un error al registrar prospecto");

                })
        }
    };


    return (
        <>
            <div className="inicio-body">

                <form class= "Inicio-formulario">
                    <div>
                        <label htmlFor="Correo Electronico"></label>
                        <input name="correoElectronico" id="correoElectronico" type="email" placeholder="Correo" autofocus required class= "input" />
                    </div>
                    <div>
                        <label htmlFor="Numero de Documento"></label>
                        <input name="tipoDocumento" id="tipoDocumento" type="number" placeholder="Numero ID" autofocus required class= "input" />
                    </div>
                </form>
            </div>
        
        
        </>
    )
};

export default Login_Test;