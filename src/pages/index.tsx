import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import LoginYouTube from '../components/LoginYoutube';

export default function Home() {
  return (
    <Container className="py-5">
      <Header />
      <main>
        <Row>
          <Col className="py-2 col-12 col-md-6">
            <LoginYouTube />
          </Col>
        </Row>
      </main>
    </Container>
  );
}
