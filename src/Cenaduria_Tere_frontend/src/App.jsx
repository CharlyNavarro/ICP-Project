import { useEffect, useState } from 'react';
import { Cenaduria_Tere_backend } from 'declarations/Cenaduria_Tere_backend';
import {Container, Row, Card, Table, Button, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function App() {
  const [reservs, setReservs] = useState([]);
  const navigate = useNavigate();
  
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

  return (
  <Container className='m-2'>
    <Row>
      <Card>
        <Card.Body>
        <Card.Title>Cenaduría Doña Tere</Card.Title> 
        <Col>
          <Button variant="success" className='m-2' onClick={() => navigate('/crear')}>Agregar reservación</Button>
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
                  <td>*Fecha*</td>
                  <td>*Hora*</td>
                </tr>
              ))
              :<tr></tr>
            }
          </tbody>
        </Table>
        </Card.Body>
      </Card>
    </Row>
  </Container>
  );
}

export default App;
