import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { Cenaduria_Tere_backend } from 'declarations/Cenaduria_Tere_backend';
import { useNavigate } from 'react-router-dom';


export const Create = () => {
    const [nombre, setNombre] = useState("")
    const [asientos, setAsientos] = useState(0)
    const [mesas, setMesas] = useState(0)

    const navigate = useNavigate();

    const onChangeNombre = (evento) => {
        evento.preventDefault();
        const preNombre = evento.target.value;
        setNombre(preNombre);
    }

    const onChangeAsientos = (evento) => {
        evento.preventDefault();
        const preAsientos = evento.target.value;
        setAsientos(preAsientos);
    }

    const onChangeMesas = (evento) => {
        evento.preventDefault();
        const preMesas = evento.target.value;
        setMesas(preMesas);
    }

    function agregarReservacion() {
        Swal.fire("Espera un momento...");
        Swal.showLoading()
        Cenaduria_Tere_backend.addReserv(nombre, BigInt(asientos), BigInt(mesas)).then(rsv => {
            Swal.fire({
                title: "¡Listo!",
                text: "Se ha realizado la reservación con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(()=> navigate('/'))
        }).catch(()=> {
            Swal.fire({
                title: "Oops!",
                text: "Ha ocurrido un error. Intentalo más tarde.",
                icon: "error",
            });
            console.log("Error al momento de hacer la reservación.", err)
        })
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Title>Hacer una reservación</Card.Title>
                        <Card.Body>
                            <Form>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del Comensal</Form.Label>
                                    <Form.Control name='nombre' onChange={onChangeNombre} type="text" placeholder="Nombre" />
                                    <Form.Text className="text-muted">
                                        Nombre de a quien se le va a anotar la reservación.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número de sillas.</Form.Label>
                                    <Form.Control name='asientos' onChange={onChangeAsientos} type="number" placeholder="Sillas" />
                                    <Form.Text className="text-muted">
                                        Máximo 15 sillas.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número de mesas.</Form.Label>
                                    <Form.Control name='mesas' onChange={onChangeMesas} type="number" placeholder="Mesas" />
                                    <Form.Text className="text-muted">
                                        Máximo 4 mesas.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Día de la reservación.</Form.Label>
                                    <Form.Control type="date" placeholder="Fecha" />
                                </Form.Group>
                                </Row>

                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora de la reservación.</Form.Label>
                                    <Form.Control type="time" placeholder="Hora" />
                                    <Form.Text className="text-muted">
                                        Horario de las 19:00 hrs hasta las 00:00 hrs del día siguiente.
                                    </Form.Text>
                                </Form.Group>
                                </Row>

                                <Row>
                                <Button variant="info" onClick={agregarReservacion}>
                                    Enviar
                                </Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}



export default Create;