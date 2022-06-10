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
        Losusers: [],

        //Modals
        modalCrear: false,
        modalActualizar: false,

        //Para actualizar
        users: {
            id: {
                original: '',
                nuevo: ''
            },
            documentType: '',
            Document: '',
            user: '',
            name: '',
            lastName: '',
            rol: '',
            pass: '',
            Title: '',
            titleArea: ''
        },

        
    };


    // Función o Hook para ejecutarse antes de renderizar el componente
    // con el fin de obtener todos los trabajadores que están registrados en la base de datos
    componentDidMount() {
        UsuariosService.getUsers()
            .then(datos => {
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
                    id: {
                        ...this.state.users.id,
                        nuevo: ''
                    },
                    documentType: '',
                    Document: '',
                    user: '',
                    name: '',
                    lastName: '',
                    rol: '',
                    pass: '',
                    Title: '',
                    titleArea: ''
                },
                modalActualizar:false
            }
        );
    };


    //El usuario que sera actualizado
    setUsers = (usuario) => {
        this.setState({
            users: {
                id: usuario.id,
                documentType: usuario.documentType,
                Document: usuario.Document,
                user: usuario.user,
                name: usuario.name,
                lastName: usuario.lastName,
                rol: usuario.rol,
                pass: usuario.pass,
                Title: usuario.Title,
                titleArea: usuario.titleArea
            }
        })
    }


    //Steters para actualizar y crear 
    setId = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                id: {
                    ...this.state.users.id,
                    nuevo: event.target.value
                }
            }
        });
    };

    setDocumentType = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                documentType: event.target.value,
            }
        });
    };

    setDocument = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                Document: event.target.value,
            }
        });
    };

    setUser = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                user: event.target.value,
            }
        });
    };

    setName = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                name: event.target.value,
            }
        });
    };

    setLastName = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                lastName: event.target.value,
            }
        });
    };

    setRol = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                rol: event.target.value,
            }
        });
    };

    setPass = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                pass: event.target.value,
            }
        });
    };

    setTitle = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                Title: event.target.value,
            }
        });
    };

    setTitleArea = (event) => {
        this.setState({
            users: {
                ...this.state.users,
                titleArea: event.target.value,
            }
        });
    };

    //---------------------------------------

    agregarUsuario = () => {
        let id = this.state.users.id.nuevo;
        let documentType = this.state.users.documentType;
        let Document = this.state.users.Document;
        let user = this.state.users.user;
        let name = this.state.users.name;
        let lastName = this.state.users.lastName;
        let rol = this.state.users.rol;
        let pass = this.state.users.pass;
        let Title = this.state.users.Title;
        let titleArea = this.state.users.titleArea;

        if (id === '' || documentType === '' || Document === '' || user === ''
            || name === '' || lastName === '' || rol === '' || pass === '' || Title === ''
            || titleArea === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el empleado.')
        } else {
            UsuariosService.postUsers(id, documentType, Document, user, name, lastName, rol, pass, Title, titleArea)
                .then(datos => {
                    alert('¡Se ha creado el usuario con exito!');

                    let nuevoLosusers = this.state.Losusers;
                    nuevoLosusers.push(
                        {
                            id: {
                                original: id,
                                nuevo: id
                            },
                            documentType,
                            Document,
                            user,
                            name,
                            lastName,
                            rol,
                            pass,
                            Title,
                            titleArea
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
        let id = this.state.users.id.original;
        let nuevoid = this.state.users.id.nuevo;
        let documentType = this.state.users.documentType;
        let Document = this.state.users.Document;
        let user = this.state.users.user;
        let name = this.state.users.name;
        let lastName = this.state.users.lastName;
        let rol = this.state.users.rol;
        let pass = this.state.users.pass;
        let Title = this.state.users.Title;
        let titleArea = this.state.users.titleArea;

        UsuariosService.putUsers( id, nuevoid, documentType, Document, user, name, lastName, rol, pass, Title, titleArea)
        .then(datos => {
            console.log(datos);
            alert('Los datos han sido actualizados con éxito!');
            this.componentDidMount();
            this.cerrarModalCrear();
        })
        .catch(err => {
            console.log(err);
            alert('Ocurrio un error al intentar actualizar los datos')
        })
    };

    elimminarUsers = (usuario) => {
        let seguro = window.confirm("Estas seguro que deseas eliminar este usuario" + usuario.user + "?");

        if (seguro) {
            UsuariosService.deleteUsers(usuario.id.original)
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
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                    <th>Contraseña</th>
                                    <th>Titulo</th>
                                    <th>TitleArea</th>
                                    <th className="text-center"> ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.Losusers.map((usuario, id) =>(
                                        <tr key={id}>
                                            <td>{usuario.id.original}</td>
                                            <td>{usuario.documentType}</td>
                                            <td>{usuario.Document}</td>
                                            <td>{usuario.user}</td>
                                            <td>{usuario.name}</td>
                                            <td>{usuario.lastName}</td>
                                            <td>{usuario.rol}</td>
                                            <td>{usuario.pass}</td>
                                            <td>{usuario.Title}</td>
                                            <td>{usuario.titleArea}</td>
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
                            <Label for="id">  </Label>
                            <Input type="number" id="id" onChange={this.setId} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Tipo de Documento* </Label>
                            <select className="form-select" id="documentType" onChange={this.setDocumentType} arial-Label="Default select example">
                                <option defaultValue selected disabled> Elige una opcion</option>
                                <option value='Cc'> Cedula de Ciudadania </option>
                                <option value='Ti'> Tarjeta de identidad </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Numero de documento* </Label>
                            <Input type="text" id="Document" onChange={this.setDocument} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Correo Institucional* </Label>
                            <Input type="text" id="user" onChange={this.setUser} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Nombres* </Label>
                            <Input type="text" id="name" onChange={this.setName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Apellidos </Label>
                            <Input type="text" id="lastName" onChange={this.setLastName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Rol* </Label>
                            <select className="form-select" id="rol" onChange={this.setRol}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='Admin'> Administrador </option>
                                <option value='Evaluador'> Evaluador </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Contraseña* </Label>
                            <Input type="password" id="pass" onChange={this.setPass} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Titulo* </Label>
                            <Input type="text" id="Title" onChange={this.setTitle} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id"> Area* </Label>
                            <Input type="id" id="titleArea" onChange={this.setTitleArea} />
                        </FormGroup>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="primary" onClick={this.agregarUsuario}> Agregar </Button>
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
                            <Label for="id" > Id: </Label>
                            <Input type="number" id="id" onChange={this.setId} value={this.state.users.id.nuevo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Tipo de Documento</Label>
                            <select className="form-select" id="documentType" onChange={this.documentType} defaultValue={this.state.users.documentType} aria-label="Default select example">
                                <option > Elige una opcion </option>
                                {
                                    this.state.users.documentType === 'Cc' ?
                                    <option defaultValue value='Cc'> Cedula de Ciudadania </option>
                                    :
                                    <option value='Cc'> Cedula de Ciudadania </option>
                                }

                                {
                                    this.state.users.documentType === 'Ti' ?
                                    <option defaultValue value='Ti'> Tarjeta de identidad </option>
                                    :
                                    <option value='Ti'> Tarjeta de identidad </option>
                                }
                                    
                            </select>  
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Numero de Documento: </Label>
                            <Input type="text" id="Document" onChange={this.setDocument} value={this.state.users.Document} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Correo: </Label>
                            <Input type="text" id="user" onChange={this.setUser} value={this.state.users.user} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Nombres: </Label>
                            <Input type="text" id="name" onChange={this.setName} value={this.state.users.name} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Apellidos: </Label>
                            <Input type="text" id="lastName" onChange={this.setLastName} value={this.state.users.lastName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Rol: </Label>
                            <Input type="text" id="rol" onChange={this.setRol} value={this.state.users.rol} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Contraseña: </Label>
                            <Input type="text" id="pass" onChange={this.setPass} value={this.state.users.pass} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > Titulo: </Label>
                            <Input type="text" id="Title" onChange={this.setTitle} value={this.state.users.Title} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="id" > titleArea: </Label>
                            <Input type="text" id="titleArea" onChange={this.setTitleArea} value={this.state.users.titleArea} />
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