import { useEffect, useState } from 'react';
import { Cenaduria_Tere_backend } from 'declarations/Cenaduria_Tere_backend';
import {Container, Row, Card, Table, Button, Col, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Formulario from './Formulario';
import Image from 'react-bootstrap/Image';

function App() {
  const [reservs, setReservs] = useState([]);
  const [reserva, setReserv] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  useEffect (() => {
    ListaReservacion();
    }, [] )

 function ListaReservacion() {
  Swal.fire("Espera un momento...");
  Swal.showLoading()
  Cenaduria_Tere_backend.listaReserv().then(reservs => {
    setReservs(reservs);
    Swal.close();
  });
  };

  function getReservacion(numero) {
    Swal.fire("Espera un momento...");
    Swal.showLoading()
    Cenaduria_Tere_backend.getReservById(numero).then(reserva=> {
      setReserv(reserva.shift());
      Swal.close();
      setShow(true)
    });
   
    };

    function deleteReserv (numero) {
      Swal.fire("Cancelando reservación. Espere un minuto...")
      Swal.showLoading()
      Cenaduria_Tere_backend.cancelarReservacion(BigInt(numero)).then(() => {
          ListaReservacion();
      });
  }  

  return (
  <Container className='m-2'>
    <Row>
      <Card>
        <Card.Body>
        <Card.Title>Cenaduría Doña Tere</Card.Title> 
        <Col>
          <Button variant="success" className='m-2' onClick={() => navigate('/Formulario')}>Agregar reservación</Button>
        </Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Número de reservación</th>
              <th>Nombre del comensal</th>
              <th>Número de asientos</th>
              <th>Número de mesas</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {

              reservs.length > 0?
              reservs.map((rsv) => (
                <tr>
                  <td>{Number(rsv.numero)}</td>
                  <td>{rsv.nombre}</td>
                  <td>{Number(rsv.asientos)}</td>
                  <td>{Number(rsv.mesas)}</td>
                  <td>{rsv.fecha}</td>
                  <td>{rsv.hora}</td>
                  <Row>
                    <Col>
                    <Button variant="info" onClick={()=>getReservacion(rsv.numero)}>Editar</Button>
                    </Col>
                    <Col>
                    <Button variant="danger" onClick={()=> deleteReserv(rsv.numero)}>Borrar</Button>
                    </Col>
                  </Row>
                </tr>
              ))
              :<tr></tr>
            }
          </tbody>
        </Table>
        </Card.Body>
      </Card>
    </Row>

    <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Reservacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formulario
              NúmeroReservación ={Number(reserva.numero)}
              NombreComensal={reserva.nombre}
              NúmeroAsientos={Number(reserva.asientos)}
              NúmeroMesas={Number(reserva.mesas)}
              Fecha={reserva.fecha}
              Hora= {reserva.hora}
              isEditable ={true}
              setShow={setShow}
              ListaReservacion={ListaReservacion}
              />

        </Modal.Body>
        
      </Modal>
      <Image src="RegistrReserv.jpg" fluid/>;
  </Container>
  );
}

export default App;
