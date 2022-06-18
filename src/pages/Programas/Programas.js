import React from 'react';
import './Css_Programas/Programas.css';
import { Button, Table, Container } from 'react-bootstrap';

// Reactstrap
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Label, Input, } from "reactstrap";

//Service
import ProgramasService from '../../services/ProgramasService/ProgramasService.js';

class Programas extends React.Component {

    state = {
        Losprogramas: [],

        //Modals
        modalCrear: false,
        modalActualizar: false,

        //Arreglo campos para crear y actualizar
        programas: {
            numConsecutivo: {
                original: '',
                nuevo: ''
            },
            nombre: '',
            ciclo: '',
            verbal: '',
            matematico: '',
            visualEspacial: '',
            kinesico: '',
            musical: '',
            intrapersonal: '',
            interpersonal: '',
            naturalista: '',
            pertenceUAO: ''

        },
    };

    // Función o Hook para ejecutarse antes de renderizar el componente
    // con el fin de obtener todos los programas que están registrados en la base de datos
    componentDidMount() {
        ProgramasService.getProgramas()
            .then(datos => {
                console.log(datos);
                this.setState(
                    {
                        Losprogramas: datos.data
                    }
                )
            })
            .catch(err => {
                console.log(err);
                alert('Ocurrió un error al intentar obtener los programas');
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
    mostrarModalActualizar = (programa) => {
        this.setState(
            {
                programas: programa,
                modalActualizar: true
            }
        );
    };

    cerrarModalActualizar = () => {
        this.setState(
            {
                programas: {
                    numConsecutivo: {
                        ...this.state.programas.numConsecutivo,
                        nuevo: ''
                    },
                    nombre: '',
                    ciclo: '',
                    verbal: '',
                    matematico: '',
                    visualEspacial: '',
                    kinesico: '',
                    musical: '',
                    intrapersonal: '',
                    interpersonal: '',
                    naturalista: '',
                    pertenceUAO: ''   
                },
                modalActualizar: false
            }
        );
    };


    //El programa que sera actualizado
    setProgramas = (programa) => {
        this.setState({
            programas: {
                numConsecutivo: programa.numConsecutivo,
                nombre: programa.nombre,
                ciclo: programa.ciclo,
                verbal: programa.verbal,
                matematico: programa.matematico,
                visualEspacial: programa.visualEspacial,
                kinesico: programa.kinesico,
                musical: programa.musical,
                intrapersonal: programa.intrapersonal,
                interpersonal: programa.interpersonal,
                naturalista: programa.naturalista,
                pertenceUAO: programa.pertenceUAO
            }
        })
    }


    //Setters para actualizar y crear 
    setNumConsecutivo = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                numConsecutivo: {
                    ...this.state.programas.numConsecutivo,
                    nuevo: event.target.value
                }
            }
        });
    };

    setNombre = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                nombre: event.target.value,
            }
        });
    };

    setCiclo = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                ciclo: event.target.value,
            }
        });
    };

    setVerbal = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                verbal: event.target.value,
            }
        });
    };

    setMate = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                matematico: event.target.value,
            }
        });
    };

    setVisualEs = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                visualEspacial: event.target.value,
            }
        });
    };

    setKinesico = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                kinesico: event.target.value,
            }
        });
    };

    setMusical = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                musical: event.target.value,
            }
        });
    };

    setIntra = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                intrapersonal: event.target.value,
            }
        });
    };

    setInter = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                interpersonal: event.target.value,
            }
        });
    };

    setNatura = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                naturalista: event.target.value,
            }
        });
    };

    setPertenece = (event) => {
        this.setState({
            programas: {
                ...this.state.programas,
                pertenceUAO: event.target.value,
            }
        });
    };


    //-----------------------------

    agregarProgramas = () => {
        let numConsecutivo = this.state.programas.numConsecutivo.nuevo;
        let nombre = this.state.programas.nombre;
        let ciclo = this.state.programas.ciclo;
        let verbal = this.state.programas.verbal;
        let matematico = this.state.programas.matematico;
        let visualEspacial = this.state.programas.visualEspacial;
        let kinesico = this.state.programas.kinesico;
        let musical = this.state.programas.musical;
        let intrapersonal = this.state.programas.intrapersonal;
        let interpersonal = this.state.programas.interpersonal;
        let naturalista = this.state.programas.naturalista;
        let pertenceUAO = this.state.programas.pertenceUAO;


        if (numConsecutivo === '' || nombre === '' || ciclo === '' || verbal === '' || matematico === ''
        || visualEspacial === '' || kinesico === '' || musical === '' || intrapersonal === ''
        || interpersonal === '' || naturalista === '' || pertenceUAO === '') {
            alert('Por favor digita todos los campos obligatorios para agregar el programa')
        } else {
            ProgramasService.postProgramas(numConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO)
            .then(datos => {
                console.log(datos);
                alert('¡Se ha creado el programa con exito!');

                let nuevoLosprogramas = this.state.Losprogramas;
                nuevoLosprogramas.push(
                    {
                        numConsecutivo: {
                            original: numConsecutivo,
                            nuevo: numConsecutivo
                        },
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
                    }
                );

                this.setState({
                    Losprogramas: nuevoLosprogramas
                });

                this.cerrarModalCrear();
            })
            .catch(error => {
                alert('Ocurrió un error al intentar crear un programa')
            })
        }
    };


    editarProgramas = () => {
        let numConsecutivo = this.state.programas.numConsecutivo.original;
        let nuevoConsecutivo = this.state.programas.numConsecutivo.nuevo;
        let nombre = this.state.programas.nombre;
        let ciclo = this.state.programas.ciclo;
        let verbal = this.state.programas.verbal;
        let matematico = this.state.programas.matematico;
        let visualEspacial = this.state.programas.visualEspacial;
        let kinesico = this.state.programas.kinesico;
        let musical = this.state.programas.musical;
        let intrapersonal = this.state.programas.intrapersonal;
        let interpersonal = this.state.programas.interpersonal;
        let naturalista = this.state.programas.naturalista;
        let pertenceUAO = this.state.programas.pertenceUAO;

        ProgramasService.putProgramas(numConsecutivo, nuevoConsecutivo, nombre, ciclo, verbal, matematico, visualEspacial, kinesico, musical, intrapersonal, interpersonal, naturalista, pertenceUAO)
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

    eliminarProgramas = (programa) => {
        let seguro = window.confirm("Estas seguro que deseas eliminar este programa:" + programa.nombre + "?");

        if(seguro) {
            ProgramasService.deleteProgramas(programa.numConsecutivo.original)
            .then(datos => {
                console.log(datos);
                alert('¡El programa academico ha sido eliminado con éxito!');
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
                alert('Ocurrio un error al intentar eliminar un programa academico.');
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
                                Agregar Programa
                            </Button>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Buscar programa" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Bsucar</button>
                            </form>
                        </div>
                        <Table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Ciclo</th>
                                    <th>Verbal</th>
                                    <th>Matematico</th>
                                    <th>Visual</th>
                                    <th>Kinesico</th>
                                    <th>Musical</th>
                                    <th>Intra</th>
                                    <th>Inter</th>
                                    <th>Naturalista</th>
                                    <th>PerteneceUAO?</th>
                                    <th className="text-center">ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.Losprogramas.map((programa, cod) =>(
                                        <tr key={cod}>
                                            <td>{programa.numConsecutivo.original}</td>
                                            <td>{programa.nombre}</td>
                                            <td>{programa.ciclo}</td>
                                            <td>{programa.verbal}</td>
                                            <td>{programa.matematico}</td>
                                            <td>{programa.visualEspacial}</td>
                                            <td>{programa.kinesico}</td>
                                            <td>{programa.musical}</td>
                                            <td>{programa.intrapersonal}</td>
                                            <td>{programa.interpersonal}</td>
                                            <td>{programa.naturalista}</td>
                                            <td>{programa.pertenceUAO}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                <Button className="btn btn-primary me-2 text-capitalize" onClick={() => this.mostrarModalActualizar(programa)} role="button">Editar</Button>
                                                <Button className="btn btn-danger ms-2 text-capitalize" onClick={() => this.eliminarProgramas(programa)} type='button'>Eliminar</Button>
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

                {/* Modal crear programa */}

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>
                        Agregar Programa
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="numConsecutivo">ID</Label>
                            <Input type="number" id="numConsecutivo" onChange={this.setNumConsecutivo}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Nombre</Label>
                            <Input type="text" id="nombre" onChange={this.setNombre}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Ciclo</Label>
                            <Input type="text" id="ciclo" onChange={this.setCiclo}/>
                        </FormGroup>
                        
                                <p>Inteligencias relacionadas:</p>

                        <FormGroup>
                            <Label for="numConsecutivo">I.Verbal?</Label>
                            <select className="form-select" id="verbal" onChange={this.setVerbal}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Matematica?</Label>
                            <select className="form-select" id="matematico" onChange={this.setMate}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Visual Espacial?</Label>
                            <select className="form-select" id="visualEspacial" onChange={this.setVisualEs}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Kinesica?</Label>
                            <select className="form-select" id="kinesico" onChange={this.setKinesico}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Musical?</Label>
                            <select className="form-select" id="musical" onChange={this.setMusical}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Intrapersonal?</Label>
                            <select className="form-select" id="intrapersonal" onChange={this.setIntra}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Interpersonal?</Label>
                            <select className="form-select" id="interpersonal" onChange={this.setInter}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Naturalista?</Label>
                            <select className="form-select" id="naturalista" onChange={this.setNatura}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Pertenece a UAO?</Label>
                            <select className="form-select" id="pertenceUAO" onChange={this.setPertenece}>
                                <option defaultValue selected disabled>Elige una opcion</option>
                                <option value='SI'> SI </option>
                                <option value='NO'> NO </option>
                            </select>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.agregarProgramas}> Agregar </Button>
                        <Button color="red" onClick={this.cerrarModalCrear}>Cerrar</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal de editar programa */}
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        Editar Programa
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="numConsecutivo">ID:</Label>
                            <Input type="number" id="numConsecutivo" onChange={this.setNumConsecutivo} value={this.state.programas.numConsecutivo.nuevo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Nombre:</Label>
                            <Input type="text" id="nombre" onChange={this.setNombre} value={this.state.programas.nombre} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Ciclo:</Label>
                            <Input type="text" id="ciclo" onChange={this.setCiclo} value={this.state.programas.ciclo} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Verbal?</Label>
                            <select className="form-select" id="verbal" onChange={this.setVerbal} defaultValue={this.state.programas.verbal} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.verbal === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.verbal === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Matematica?</Label>
                            <select className="form-select" id="matematico" onChange={this.setMate} defaultValue={this.state.programas.matematico} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.matematico === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.matematico === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Visual Espacial?</Label>
                            <select className="form-select" id="visualEspacial" onChange={this.setVisualEs} defaultValue={this.state.programas.visualEspacial} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.visualEspacial === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.visualEspacial === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Kinesica?</Label>
                            <select className="form-select" id="kinesico" onChange={this.setKinesico} defaultValue={this.state.programas.kinesico} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.kinesico === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.kinesico === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Musical?</Label>
                            <select className="form-select" id="musical" onChange={this.setMusical} defaultValue={this.state.programas.musical} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.musical === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.musical === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Intrapersonal?</Label>
                            <select className="form-select" id="intrapersonal" onChange={this.setIntra} defaultValue={this.state.programas.intrapersonal} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.intrapersonal === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.intrapersonal === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Interpersonal?</Label>
                            <select className="form-select" id="interpersonal" onChange={this.setInter} defaultValue={this.state.programas.interpersonal} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.interpersonal === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.interpersonal === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">I.Naturalista?</Label>
                            <select className="form-select" id="naturalista" onChange={this.setNatura} defaultValue={this.state.programas.naturalista} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.naturalista === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.naturalista === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numConsecutivo">Pertenece a UAO?</Label>
                            <select className="form-select" id="pertenceUAO" onChange={this.setPertenece} defaultValue={this.state.programas.pertenceUAO} aria-label="Default select example" >
                                <option disabled>Elige una opcion</option>
                                {
                                    this.state.programas.pertenceUAO === 'SI' ?
                                    <option defaultValue value='SI'> SI </option>
                                    :
                                    <option value='SI'> SI </option>
                                }

                                {
                                    this.state.programas.pertenceUAO === 'NO' ?
                                    <option defaultValue value='NO'> NO </option>
                                    :
                                    <option value='NO'> NO </option>

                                }
                            </select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                            <Button color="primary" onClick={this.editarProgramas}>Aceptar</Button>
                            <Button color="secondary" onClick={this.cerrarModalActualizar}>Cerrar</Button>
                    </ModalFooter>

                </Modal>
            </div>
        )
    }
}

export default Programas;