import { Container, Row, Col, Button } from 'react-bootstrap';


export default function WelcomeComponent (props) {
    return (
      <Container fluid className="bg-light">
        <Row className="d-flex align-items-center justify-content-center text-center vh-100">
          <Col xs={5}>
            <h2>Amberwood Club</h2>
            <p className="lead">Skonfiguruj swój zestaw</p>
            <Button onClick={() => props.toggle()}className="btn btn-light">Start</Button>
          </Col>
        </Row>
      </Container>
    )
}
