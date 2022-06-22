// React-Bootstrap
import React from 'react';
import './Css_Usuarios/Users.css';
import { Button, Table, Container } from 'react-bootstrap';

// Reactstrap
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Label, Input, } from "reactstrap";

// Services
import UsuariosService from '../../services/UsuariosService/UsuariosService';



class Users extends React.Component {

    state = {
        LosUsers: [],

        //Modals
        modalCrear: false,
        modalActualizar: false,

        //Areglo campos para  crear y actualizar
        users: {
            ID: {
                original: '',
                nuevo: ''
            },
            correoInstitucional: '',
            password: '',
            tipoDocumento: '',
            numDocumento: '',
            nombre: '',
            apellido: '',
            cargo: '',
            areaCargo: '',
            perfilCargo: ''
        },

    };


    // Función o Hook para ejecutarse antes de renderizar el componente
    // con el fin de obtener todos los trabajadores que están registrados en la base de datos
    componentDidMount() {
        UsuariosService.getUsers()
            .then(datos => {
                console.log(datos.data);
                this.setState(
                    {
                        Losusers: datos.data
                    }
                )
            })
            .catch(err => {
                console.log(err);
                alert('Ocurrió un error al intentar obtener los usuarios');
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
    mostrarModalActualizar = (usuario) => {
        this.setState(
            {
                users: usuario,
                modalActualizar: true
            }
        );
    };


    cerrarModalActualizar = () => {
        this.setState(
            {
                users: {
                    ID: {
                        ...this.state.users.ID,
                        nuevo: ''
                    },
                    correoInstitucional: '',
                    password: '',
                    tipoDocumento: '',
                    numDocumento: '',
                    nombre: '',
                    apellido: '',
                    cargo: '',
                    areaCargo: '',
                    perfilCargo: ''
                },
                modalActualizar:false
            }
        );
    };


    //El usuario que sera actualizado
    setUsers = (usuario) => {
        this.setState({
            users: {
                ID: usuario.ID,
                correoInstitucional: usuario.correoInstitucional,
                password: usuario.password,
                tipoDocumento: usuario.tipoDocumento,
                numDocumento: usuario.numDocumento,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                cargo: usuario.cargo,
                areaCargo: usuario.areaCargo,
                perfilCargo: usuario.perfilCargo
            }
        })
    }


    //Setters para actualizar y crear 
    setId = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                ID: {
                    ...this.state.users.ID,
                    nuevo: event.target.value
                }
            }
        });
    };

    setCorreoInstitucional = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                correoInstitucional: event.target.value,
            }
        });
    };

    setPassword = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                password: event.target.value,
            }
        });
    };

    setTipoDocumento = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                tipoDocumento: event.target.value,
            }
        });
    };

    setNumDocumento = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                numDocumento: event.target.value,
            }
        });
    };

    setNombre = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                nombre: event.target.value,
            }
        });
    };

    setApellido = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                apellido: event.target.value,
            }
        });
    };

    setCargo = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                cargo: event.target.value,
            }
        });
    };

    setAreaCargo = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                areaCargo: event.target.value,
            }
        });
    };

    setPerfilCargo = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                perfilCargo: event.target.value,
            }
        });
    };

    //---------------------------------------

    agregarUsuario = () => {
        let ID = this.state.users.ID.nuevo;
        let correoInstitucional = this.state.users.correoInstitucional;
        let password = this.state.users.password;
        let tipoDocumento = this.state.users.tipoDocumento;
        let numDocumento = this.state.users.numDocumento;
        let nombre = this.state.users.nombre;
        let apellido = this.state.users.apellido;
        let cargo = this.state.users.cargo;
        let areaCargo = this.state.users.areaCargo;
        let perfilCargo = this.state.users.perfilCargo;

        if (ID === '' || correoInstitucional === '' || password === '' || tipoDocumento === ''
            || numDocumento === '' || nombre === '' || apellido === '' || cargo === '' || areaCargo === ''
            || perfilCargo === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el empleado.')
        } else {
            UsuariosService.postUsers(ID, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo)
                .then(datos => {
                    console.log(datos);
                    alert('¡Se ha creado el usuario con exito!');

                    let nuevoLosusers = this.state.Losusers;
                    nuevoLosusers.push(
                        {
                            ID: {
                                original: ID,
                                nuevo: ID
                            },
                            correoInstitucional,
                            password,
                            tipoDocumento,
                            numDocumento,
                            nombre,
                            apellido,
                            cargo,
                            areaCargo,
                            perfilCargo
                        }
                    );

                    this.setState({
                        Losusers: nuevoLosusers
                    });

                    this.cerrarModalCrear();
                })
                .catch(error => {
                    alert('Ocurrió un error al intentar crear un usuario')
                })
        }
    };

    editarUsers = () => {
        let ID = this.state.users.ID.original;
        let nuevoid = this.state.users.ID.nuevo;
        let correoInstitucional = this.state.users.correoInstitucional;
        let password = this.state.users.password;
        let tipoDocumento = this.state.users.tipoDocumento;
        let numDocumento = this.state.users.numDocumento;
        let nombre = this.state.users.nombre;
        let apellido = this.state.users.apellido;
        let cargo = this.state.users.cargo;
        let areaCargo = this.state.users.areaCargo;
        let perfilCargo = this.state.users.perfilCargo;

        UsuariosService.putUsers( ID, nuevoid, correoInstitucional, password, tipoDocumento, numDocumento, nombre, apellido, cargo, areaCargo, perfilCargo )
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
    };

    elimminarUsers = (usuario) => {
        let seguro = window.confirm("Estas seguro que deseas eliminar este usuario" + usuario.correoInstitucional + "?");

        if (seguro) {
            UsuariosService.deleteUsers(usuario.ID.original)
            .then(datos => {
                console.log(datos);
                alert('¡El usuario ha sido eliminado con éxito!');
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
                alert ('Ocurrio un error al intentar eliminar un usuario.');
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
                                Agregar Usuario
                            </Button>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar empleado" aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                        <Table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Tipo Documento</th>
                                    <th>Numero documento</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                    <th>Titulo</th>
                                    <th>TitleArea</th>
                                    <th className="text-center"> ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.LosUsers.map((usuario, id) =>(
                                        <tr key={id}>
                                            <td>{usuario.ID.original}</td>
                                            <td>{usuario.tipoDocumento}</td>
                                            <td>{usuario.numDocumento}</td>
                                            <td>{usuario.correoInstitucional}</td>
                                            <td>{usuario.password}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.cargo}</td>
                                            <td>{usuario.perfilCargo}</td>
                                            <td>{usuario.areaCargo}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                <Button className="btn btn-primary me-2 text-capitalize"  onClick={() => this.mostrarModalActualizar(usuario)} role="button">Editar</Button>
                                                <Button className="btn btn-danger ms-2 text-capitalize" onClick={() => this.elimminarUsers(usuario)} type='button'>Eliminar</Button>

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
            
                {/* Modal crear usuarios */}

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>
                        Agregar empleado
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                            <Label for="ID">  </Label>
                            <Input type="number" id="ID" onChange={this.setId} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Tipo de Documento* </Label>
                            <select className="form-select" id="tipoDocumento" onChange={this.setTipoDocumento} arial-Label="Default select example">
                                <option defaultValue selected disabled> Elige una opcion</option>
                                <option value='Cc'> Cedula de Ciudadania </option>
                                <option value='Ti'> Tarjeta de identidad </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Numero de documento* </Label>
                            <Input type="text" id="numDocumento" onChange={this.setNumDocumento} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Correo Institucional* </Label>
                            <Input type="text" id="correoInstitucional" onChange={this.setCorreoInstitucional} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Nombres* </Label>
                            <Input type="text" id="nombre" onChange={this.setNombre} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Apellidos </Label>
                            <Input type="text" id="apellido" onChange={this.setApellido} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Rol* </Label>
                            <select className="form-select" id="cargo" onChange={this.setCargo}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='Admin'> Administrador </option>
                                <option value='Evaluador'> Evaluador </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Contraseña* </Label>
                            <Input type="password" id="password" onChange={this.setPassword} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Titulo* </Label>
                            <Input type="text" id="perfilCargo" onChange={this.setPerfilCargo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID"> Area* </Label>
                            <Input type="text" id="areaCargo" onChange={this.setAreaCargo} />
                        </FormGroup>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="ID" onClick={this.agregarUsuario}> Agregar </Button>
                        <Button color="secondary" onClick={this.cerrarModalCrear}>Cerrar</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal de editar usuario */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        Editar Usuario
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="ID" > Id: </Label>
                            <Input type="number" id="ID" onChange={this.setId} value={this.state.users.ID.nuevo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Tipo de Documento</Label>
                            <select className="form-select" id="tipoDocumento" onChange={this.setTipoDocumento} defaultValue={this.state.users.tipoDocumento} aria-label="Default select example" > 
                                <option> Elige una opcion </option>
                                {
                                    this.state.users.tipoDocumento === 'Cc' ?
                                    <option defaultValue value='Cc'> Cedula de Ciudadania </option>
                                    :
                                    <option value='Cc'> Cedula de Ciudadania </option>
                                }

                                {
                                    this.state.users.tipoDocumento === 'Ti' ?
                                    <option defaultValue value='Ti'> Tarjeta de identidad </option>
                                    :
                                    <option value='Ti'> Tarjeta de identidad </option>
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Numero de Documento: </Label>
                            <Input type="text" id="numDocumento" onChange={this.setNumDocumento} value={this.state.users.numDocumento} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Correo: </Label>
                            <Input type="text" id="correoInstitucional" onChange={this.setCorreoInstitucional} value={this.state.users.correoInstitucional} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Nombres: </Label>
                            <Input type="text" id="nombre" onChange={this.setNombre} value={this.state.users.nombre} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Apellidos: </Label>
                            <Input type="text" id="apellido" onChange={this.setApellido} value={this.state.users.apellido} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Rol: </Label>
                            <select className="form-select" id="cargo" onChange={this.setCargo} defaultValue={this.state.users.cargo} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>

                                {
                                    this.state.users.cargo === 'Admin' ?
                                    <option defaultValue value='Admin'> Administrador </option>
                                    :
                                    <option value='Admin'> Administrador </option>
                                }

                                {
                                    this.state.users.cargo === 'Evaluador' ?
                                    <option defaultValue value='Evaluador'> Evaluador </option>
                                    :
                                    <option value='Evaluador'> Evaluador </option>
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Contraseña: </Label>
                            <Input type="text" id="password" onChange={this.setPassword} value={this.state.users.password} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > Titulo: </Label>
                            <Input type="text" id="perfilCargo" onChange={this.setPerfilCargo} value={this.state.users.perfilCargo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ID" > titleArea: </Label>
                            <Input type="text" id="areaCargo" onChange={this.setAreaCargo} value={this.state.users.areaCargo} />
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" onClick={this.editarUsers}>Aceptar</Button>
                            <Button color="secondary" onClick={this.cerrarModalActualizar}>Cerrar</Button>
                        </ModalFooter>
                    </ModalBody>

                </Modal>
            </div>
        );
    }

}

export default Users;