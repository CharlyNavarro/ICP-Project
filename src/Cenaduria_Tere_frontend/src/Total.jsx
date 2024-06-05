import React from "react";
import {Container, Row, Col, Card} from 'react-bootstrap'
export const Total = () => {
    return (
        <Container>
            <Col>
                <h1>reservaciones totales</h1>
                <Row>Agregar</Row>
                <Row>Eliminar</Row>
                <Row>Editar</Row>
            </Col>
        </Container>
    )
    
}
export default Total;