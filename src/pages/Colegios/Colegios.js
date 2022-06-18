import React from 'react';
import './Css_Colegios/Colegios.css';
import { Button, Table, Container } from 'react-bootstrap';

// Reactstrap
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Label, Input, } from "reactstrap";

//Services
import ColegiosService from '../../services/ColegiosService/ColegiosService';




class Colegios extends React.Component {

    state = {
        Loscolegios: [],

        //Modals
        modalCrear: false,
        modalActualizar: false,

        //Arreglo campos para crear y actualizar 
        colegios: {
            codigoDane: {
                original: '',
                nuevo: ''
            },
            nombre: '',
            clasificacion: '',
            ciudad: '',
            correoInstitucional: '',
            numeroTelefono: '',
            nombreRepresentante: ''
        },
    };

    // Función o Hook para ejecutarse antes de renderizar el componente
    // con el fin de obtener todos los colegios que están registrados en la base de datos
    componentDidMount() {
        ColegiosService.getColegios()
            .then(datos => {
                this.setState(
                    {
                        Loscolegios: datos.data
                    }
                )
            })
            .catch(err => {
                console.log(err);
                alert('Ocurrió un error al intentar obtener los colegios')
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
    mostrarModalActualizar = (colegio) => {
        this.setState(
            {
                colegios: colegio,
                modalActualizar: true
            }
        );
    };


    cerrarModalActualizar = () => {
        this.setState(
            {
                colegios: {
                    codigoDane: {
                        ...this.state.colegios.codigoDane,
                        nuevo: ''
                    },
                    nombre: '',
                    clasificacion: '',
                    ciudad: '',
                    correoInstitucional: '',
                    numeroTelefono: '',
                    nombreRepresentante: ''
                },
                modalActualizar: false
            }
        );
    };


    //El colegio que sera actualizado
    setColegios = (colegio) => {
        this.setState({
            colegios: {
                codigoDane: colegio.codigoDane,
                nombre: colegio.nombre,
                clasificacion: colegio.clasificacion,
                ciudad: colegio.ciudad,
                correoInstitucional: colegio.correoInstitucional,
                numeroTelefono: colegio.numeroTelefono,
                nombreRepresentante: colegio.nombreRepresentante
            }
        })
    }


    //Setters para actualizar y crear
    setCodigoDane = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                codigoDane: {
                    ...this.state.colegios.codigoDane,
                    nuevo: event.target.value
                }
            }
        });
    };

    setNombre = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                nombre: event.target.value,
            }
        });
    };

    setClasifi = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                clasificacion: event.target.value,
            }
        });
    };

    setCiudad = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                ciudad: event.target.value,
            }
        });
    };

    setCorreoInst = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                correoInstitucional: event.target.value,
            }
        });
    };

    setNumTel = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                numeroTelefono: event.target.value,
            }
        });
    };

    setNombreRepre = (event) => {
        this.setState({
            colegios: {
                ...this.state.colegios,
                nombreRepresentante: event.target.value,
            }
        });
    };


    //---------------------------------

    agregarColegios = () => {
        let codigoDane = this.state.colegios.codigoDane.nuevo;
        let nombre = this.state.colegios.nombre;
        let clasificacion = this.state.colegios.clasificacion;
        let ciudad = this.state.colegios.ciudad;
        let correoInstitucional = this.state.colegios.correoInstitucional;
        let numeroTelefono = this.state.colegios.numeroTelefono;
        let nombreRepresentante = this.state.colegios.nombreRepresentante;

        if (codigoDane === '' || nombre === '' || clasificacion === '' ||
            ciudad === '' || correoInstitucional === '' || numeroTelefono === '' || nombreRepresentante === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el colegio.')
        } else {
            ColegiosService.postColegios(codigoDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante)
                .then(datos => {
                    console.log(datos);
                    alert('¡Se ha creado el colegio con exito!');

                    let nuevoLoscolegios = this.state.Loscolegios;
                    nuevoLoscolegios.push(
                        {
                            codigoDane: {
                                original: codigoDane,
                                nuevo: codigoDane
                            },
                            nombre,
                            clasificacion,
                            ciudad,
                            correoInstitucional,
                            numeroTelefono,
                            nombreRepresentante
                        }
                    );

                    this.setState({
                        Loscolegios: nuevoLoscolegios
                    });

                    this.cerrarModalCrear();
                })
                .catch(error => {
                    alert('Ocurrió un error al intentar crear un colegio')
                })
        }
    };


    editarColegios = () => {
        let codigoDane = this.state.colegios.codigoDane.original;
        let nuevocodDane = this.state.colegios.codigoDane.nuevo;
        let nombre = this.state.colegios.nombre;
        let clasificacion = this.state.colegios.clasificacion;
        let ciudad = this.state.colegios.ciudad;
        let correoInstitucional = this.state.colegios.correoInstitucional;
        let numeroTelefono = this.state.colegios.numeroTelefono;
        let nombreRepresentante = this.state.colegios.nombreRepresentante;

        if (codigoDane === '' || nuevocodDane === '' || nombre === '' || clasificacion === '' ||
            ciudad === '' || correoInstitucional === '' || numeroTelefono === '' || nombreRepresentante === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el empleado.')
        } else {
            ColegiosService.putColegios(codigoDane, nuevocodDane, nombre, clasificacion, ciudad, correoInstitucional, numeroTelefono, nombreRepresentante)
                .then(datos => {
                    console.log(datos);
                    alert('Los datos han sido actualizados con éxito!');
                    this.componentDidMount();
                    this.cerrarModalActualizar();
                })
                .catch(err => {
                    console.log(err);
                    alert('Ocurrio un error al intentar actualizar los datos')
                })
        }

    };

    eliminarColegios = (colegio) => {
        let seguro = window.confirm("Estas seguro que deseas eliminar este colegio nombre:" + colegio.nombre + "?");

        if (seguro) {
            ColegiosService.deleteColegios(colegio.codigoDane.original)
                .then(datos => {
                    console.log(datos);
                    alert('¡El colegio ha sido eliminado con éxito!');
                    this.componentDidMount();
                })
                .catch(err => {
                    console.log(err);
                    alert('Ocurrio un error al intentar eliminar el colegio.');
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
                                Agregar Colegio
                            </Button>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar colegio" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                        <Table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Codigo DANE</th>
                                    <th>Nombre Colegio</th>
                                    <th>Clasificacion</th>
                                    <th>Ciudad</th>
                                    <th>Correo</th>
                                    <th>Telefono</th>
                                    <th>Representante</th>
                                    <th className="text-center"> ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.Loscolegios.map((colegio, cod) => (
                                        <tr key={cod}>
                                            <td>{colegio.codigoDane.original}</td>
                                            <td>{colegio.nombre}</td>
                                            <td>{colegio.clasificacion}</td>
                                            <td>{colegio.ciudad}</td>
                                            <td>{colegio.correoInstitucional}</td>
                                            <td>{colegio.numeroTelefono}</td>
                                            <td>{colegio.nombreRepresentante}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Button className="btn btn-primary me-2 text-capitalize" onClick={() => this.mostrarModalActualizar(colegio)} role="button">Editar</Button>
                                                    <Button className="btn btn-danger ms-2 text-capitalize" onClick={() => this.eliminarColegios(colegio)} type='button'>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>

                                    )

                                    )
                                }
                            </tbody>
                        </Table>
                    </Container>
                </div>

                {/* Modal crear colegio */}

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>
                        Agregar Colegio
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="codigoDane"> Codigo DANE* </Label>
                            <Input type="text" id="codigoDane" onChange={this.setCodigoDane} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Nombre Colegio* </Label>
                            <Input type="text" id="nombre" onChange={this.setNombre} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Clasificación* </Label>
                            <Input type="text" id="clasificacion" onChange={this.setClasifi} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Ciudad* </Label>
                            <Input type="text" id="ciudad" onChange={this.setCiudad} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Correo Colegio* </Label>
                            <Input type="text" id="correoInstitucional" onChange={this.setCorreoInst} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Telefono* </Label>
                            <Input type="text" id="numeroTelefono" onChange={this.setNumTel} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Nombre Representante* </Label>
                            <Input type="text" id="nombreRepresentante" onChange={this.setNombreRepre} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.agregarColegios}> Agregar </Button>
                        <Button color="secondary" onClick={this.cerrarModalCrear}> Cerrar </Button>
                    </ModalFooter>
                </Modal>


                {/* Modal de editar colegio */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        Editar Colegio
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="codigoDane"> Codigo DANE: </Label>
                            <Input type="text" id="codigoDane" onChange={this.setCodigoDane} value={this.state.colegios.codigoDane.nuevo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Nombre Colegio: </Label>
                            <Input type="text" id="nombre" onChange={this.setNombre} value={this.state.colegios.nombre} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Clasificación: </Label>
                            <Input type="text" id="clasificacion" onChange={this.setClasifi} value={this.state.colegios.clasificacion} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Ciudad: </Label>
                            <Input type="text" id="ciudad" onChange={this.setCiudad} value={this.state.colegios.ciudad} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Correo Colegio: </Label>
                            <Input type="text" id="correoInstitucional" onChange={this.setCorreoInst} value={this.state.colegios.correoInstitucional} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Telefono: </Label>
                            <Input type="text" id="numeroTelefono" onChange={this.setNumTel} value={this.state.colegios.numeroTelefono} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="codigoDane"> Nombre Representante* </Label>
                            <Input type="text" id="nombreRepresentante" onChange={this.setNombreRepre} value={this.state.colegios.nombreRepresentante} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editarColegios}> Agregar </Button>
                        <Button color="secondary" onClick={this.cerrarModalActualizar}> Cerrar </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }

}

export default Colegios;