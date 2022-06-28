import React from "react";
import './Css_Test/Test.css';
import { Button, Table, Container } from 'react-bootstrap';

// Reactstrap
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Label, Input, } from "reactstrap";

//Services
import TestService from "../../services/TestService/TestService";
import ColegiosService from "../../services/ColegiosService/ColegiosService";



class Test extends React.Component {

    state = {
        Lostest: [],

        //Modals
        modalCrear: false,
        modalActualizar: false,

        //Arreglo campos para crear y actualizar 
        tests: {
            codigoUnico: '',
            nombreTest: '',
            ciudad: '',
            colegio: '',
            estado: ''
        },
    };




    componentDidMount() {
        TestService.getTest()
            .then(datos => {
                console.log(datos);
                this.setState(
                    {
                        Lostest: datos.data
                    }
                )
            })
            .catch(err => {
                console.log(err);
                alert('Ocurrio un error al intentar obtener los test creados')
            })
    }

    


    //Modals Crear
    mostrarModalCrear = () => {
        this.setState({ modalCrear: true });
    };

    cerrarModalCrear = () => {
        this.setState({ modalCrear: false });
    };


    //Modals Actualizar
    mostrarModalActualizar = (test) => {
        this.setState(
            {
                tests: test,
                modalActualizar: true
            }
        );
    };

    cerrarModalActualizar = () => {
        this.setState(
            {
                tests: {
                    codigoUnico: '',
                    nombreTest: '',
                    ciudad: '',
                    colegio: '',
                    estado: ''   
                },
                modalActualizar: false
            }
        );
    };


    //Test que sera actualizado
    setTests = (test) => {
        this.setState({
            tests: {
                codigoUnico: test.codigoUnico,
                nombreTest: test.nombreTest,
                ciudad: test.ciudad,
                colegio: test.colegio,
                estado: test.estado
            }
        })
    }


    //Setters para actualizar y crear
    setCodigoUnico = (event) => {
        this.setState({
            tests: {
                ...this.state.tests,
                codigoUnico: event.target.value,
            }
        });
    };


    setNombreTest = (event) => {
        this.setState({
            tests: {
                ...this.state.tests,
                nombreTest: event.target.value,
            }
        });
    };


    setCiudad = (event) => {
        this.setState({
            tests: {
                ...this.state.tests,
                ciudad: event.target.value,
            }
        });
    };


    setColegio = (event) => {
        this.setState({
            tests: {
                ...this.state.tests,
                colegio: event.target.value,
            }
        });
    };

    setEstado = (event) => {
        this.setState({
            tests: {
                ...this.state.tests,
                estado: event.target.value,
            }
        });
    };


    agregarTest = () => {


            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

        let fechaDeCreacion = year + "/" + month + "/" + day;
        let codigoUnico = Math.random().toString(36).slice(2);
        let nombreTest = this.state.tests.nombreTest;
        let ciudad = this.state.tests.ciudad;
        let colegio = this.state.tests.colegio;
        let estado = this.state.tests.estado;

        if ( nombreTest === '' || ciudad === '' || colegio === ''
        || estado === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el colegio.')
        } else {
            TestService.postTest(fechaDeCreacion, codigoUnico, nombreTest, ciudad, colegio, estado)
                .then(datos => {
                    console.log(datos);
                    alert('¡Se ha creado el test con exito!');

                    let nuevoLostest = this.state.Lostest;
                    nuevoLostest.push(
                        {
                            fechaDeCreacion,
                            codigoUnico,
                            nombreTest,
                            ciudad,
                            colegio,
                            estado
                        }
                    );

                    this.setState({
                        Lostest: nuevoLostest
                    });

                    this.cerrarModalCrear();
                })
                .catch(error => {
                    alert('Ocurrió un error al intentar crear un testito')
                })
        }
    };


    editarTest = () => {
        let nombreTest = this.state.tests.nombreTest;
        let ciudad = this.state.tests.ciudad;
        let colegio = this.state.tests.colegio;
        let estado = this.state.tests.estado;
        let codigoUnico = this.state.tests.codigoUnico;


            TestService.putTest(nombreTest, ciudad, colegio, estado, codigoUnico)
                .then(datos => {
                    console.log(datos);
                    alert('Los datos han sido actualizados con éxito!');
                    this.componentDidMount();
                    this.cerrarModalActualizar();
                })
                .catch(err => {
                    console.log(err);
                    alert('Ocurrio un error al intentar actualizar los datos');
                })
    };



    eliminarTest = (test) => {
        let seguro = window.confirm("Estas seguro que deseas eliminar este colegio nombre:" + test.nombreTest + "?");

        if (seguro) {
            TestService.deleteTest(test.codigoUnico)
                .then(datos => {
                    console.log(datos);
                    alert('¡El test ha sido eliminado con éxito!');
                    this.componentDidMount();
                })
                .catch(err => {
                    console.log(err);
                    alert('Ocurrio un error al intentar eliminar el test')
                })

        }
    };


    render() {
        return (
            <div>

                <div className='dashboard_list'>
                    <Container>
                        <div className='form_list'>
                            <Button type='button' className="btn btn-primary text-capitalize" onClick={this.mostrarModalCrear}>
                                Agregar Test
                            </Button>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar test" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                        <Table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Fecha de Creacion</th>
                                    <th>Codigo</th>
                                    <th>Nombre test</th>
                                    <th>Colegio</th>
                                    <th>Ciudad</th>
                                    <th>Estado</th>
                                    <th className="text-center">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Lostest.map((test, cod) =>(
                                        <tr key={cod}>
                                            <td>{test.fechaDeCreacion}</td>
                                            <td>{test.codigoUnico}</td>
                                            <td>{test.nombreTest}</td>
                                            <td>{test.colegio}</td>
                                            <td>{test.ciudad}</td>
                                            <td>{test.estado}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                <Button className="btn btn-primary me-2 text-capitalize" onClick={() => this.mostrarModalActualizar(test)} role="button">Editar</Button>
                                                <Button className="btn btn-danger ms-2 text-capitalize" onClick={() => this.eliminarTest(test)} type='button'>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Container>
                </div>

                {/* Modal crear test */}

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>
                        Agregar Test
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="codigoUnico"> Codigo </Label>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoUnico"> Nombre test </Label>
                            <Input type="text" id="nombreTest" onChange={this.setNombreTest}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoUnico"> Colegio </Label>
                            <select className="form-select" id="colegio" onChange={this.setColegio} >
                            <option disabled>Elige una opcion</option>
                                
                                
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoUnico"> Ciudad </Label>
                            <select className="form-select" id="ciudad" onChange={this.setCiudad}>
                            <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='Tura'> Tura </option>
                                <option value='Cali'> Cali </option>  
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoUnico"> Estado </Label>
                            <select className="form-select" id="estado" onChange={this.setEstado}>
                            <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='1'> Abierto </option>
                                <option value='2'> Cerrado </option>
                            </select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.agregarTest}> Agregar </Button>
                        <Button color="red" onClick={this.cerrarModalCrear}>Cerrar</Button>
                    </ModalFooter>
                </Modal>


            </div>
        )
    }

}

export default Test;