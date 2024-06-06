import { useEffect, useState } from 'react';
import { Cenaduria_Tere_backend } from 'declarations/Cenaduria_Tere_backend';
import {Container, Row, Card, Table} from 'react-bootstrap';


function App() {
  const [reservs, setReservs] = useState([]);
  
  useEffect (() => {
    ListaReservacion();
    }, [] )

 function ListaReservacion() {
      Cenaduria_Tere_backend.listaReserv().then(reservs => {
        setReservs(reservs);
      });
    
  };

  return (
  <Container className='m-2'>
    <Row>
      <Card>
        <Card.Body>
        <Card.Title>Cenaduría Doña Tere</Card.Title>  
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
                  <td>{rsv.numero}</td>
                  <td>{rsv.nombre}</td>
                  <td>{rsv.asientos}</td>
                  <td>{rsv.mesas}</td>
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
