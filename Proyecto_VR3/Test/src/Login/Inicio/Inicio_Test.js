import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


// React-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Inicio_Test = () => {

    const navigate = useNavigate();

    function irCreateProspect() {
        navigate('/CreateProspecto');
    }

    function irLogin_Test() {
        navigate('/Login_Test');
    }

    return (
        <Container className="px-0" fluid>

            <Container fliud>
                <Row>
                    <Col className="text-center col-md-6 p-5">
                        <Button variant="outline-success" size="lg" className="text-capitalize" onClick={irCreateProspect}> 
                            <div>
                            
                            <h4>Registrarse</h4>
                            </div>
                        </Button>
                    </Col>

                    <Col className="text-center col-md-6 p-5">
                        <Button variant="outline-primary" size="lg" className="text-capitalize" onClick={irLogin_Test}>
                            <div>
                            
                            <h4>Iniciar Sesión</h4>
                            </div>
                        </Button>
                    </Col>
                </Row>
            </Container>

        </Container>
    )
}


export default Inicio_Test;