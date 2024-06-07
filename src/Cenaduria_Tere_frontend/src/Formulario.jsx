import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { Cenaduria_Tere_backend } from 'declarations/Cenaduria_Tere_backend';
import { useNavigate } from 'react-router-dom';

export const Formulario = (
    {
        NúmeroReservación=null,
        NombreComensal=null,
        NúmeroAsientos=null,
        NúmeroMesas=null,
        Fecha=null,
        Hora=null,
        isEditable=null,
        ListaReservacion=null,
        setShow=null
    }
        
)=> {
    const [nombre, setNombre] = useState(NombreComensal ? NombreComensal:"")
    const [asientos, setAsientos] = useState(NúmeroAsientos ? NúmeroAsientos: 0)
    const [hora, setHora] = useState(Hora ? Hora:"")
    const [fecha, setFecha] = useState(Fecha ? Fecha:"")
    const [mesas, setMesas] = useState(NúmeroMesas ? NúmeroMesas: 0)

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

    const onChangeHora = (evento) => {
        evento.preventDefault();
        const preHora = evento.target.value;
        setHora(preHora);
    }

    const onChangeFecha = (evento) => {
        evento.preventDefault();
        const preFecha = evento.target.value;
        setFecha(preFecha);
    }

    function agregarReservacion() {
        Swal.fire("Espera un momento...");
        Swal.showLoading()
        Cenaduria_Tere_backend.addReserv(nombre, BigInt(asientos), BigInt(mesas), fecha, hora).then(rsv => {
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

    function updateReservacion() {
        Swal.fire("Espera un momento...");
        Swal.showLoading()
        Cenaduria_Tere_backend.actualizarReservacion(BigInt(NúmeroReservación), nombre, BigInt(asientos), BigInt(mesas), fecha, hora).then(() => {
            Swal.fire({
                title: "¡Listo!",
                text: "Se ha actualizado la reservación con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(() =>{
                setShow(false);
                ListaReservacion();
            }
            )
        }).catch(()=> {
            Swal.fire({
                title: "Oops!",
                text: "Ha ocurrido un error. Intentalo más tarde.",
                icon: "error",
            });
            console.log("Error al momento de actualizar la reservación.", err)
        })
    };

    

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Title>{isEditable ? "Editar" : "Agregar"} una reservación</Card.Title>
                        <Card.Body>
                            <Form>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del Comensal</Form.Label>
                                    <Form.Control defaultValue={nombre} name='nombre' disabled={isEditable ? true : false} onChange={onChangeNombre} type="text" placeholder="Nombre" required/>
                                    <Form.Text className="text-muted">
                                        Nombre de a quien se le va a anotar la reservación.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número de sillas.</Form.Label>
                                    <Form.Control defaultValue={asientos} name='asientos' onChange={onChangeAsientos} type="number" placeholder="Sillas" required/>
                                    <Form.Text className="text-muted">
                                        Máximo 15 sillas.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número de mesas.</Form.Label>
                                    <Form.Control defaultValue={mesas} name='mesas' onChange={onChangeMesas} type="number" placeholder="Mesas" required/>
                                    <Form.Text className="text-muted">
                                        Máximo 4 mesas.
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                                
                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Día de la reservación.</Form.Label>
                                    <Form.Control defaultValue={fecha} type="date" onChange={onChangeFecha} placeholder="Fecha" required/>
                                </Form.Group>
                                </Row>

                                <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora de la reservación.</Form.Label>
                                    <Form.Control defaultValue={hora} type="time"onChange={onChangeHora} placeholder="Hora" required/>
                                    <Form.Text className="text-muted">
                                        Horario de las 19:00 hrs hasta las 00:00 hrs del día siguiente.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" onClick={isEditable ? updateReservacion : agregarReservacion}>
                                        {isEditable ? "Editar" : "Guardar"}
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



export default Formulario;