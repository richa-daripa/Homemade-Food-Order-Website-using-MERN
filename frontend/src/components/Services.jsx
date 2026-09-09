import '../style.css'
import { Container, Card, Col, Row } from 'react-bootstrap';
import { services } from '../utils/data';

const Services = () => {
    return (
        <div className="service py-5">
            <h2 className='text-center mb-5'>Why Choose Us</h2>
            <Container className="mt-5 px-lg-5">
                <Row className="g-5">
                    {services.map((service, index) => (
                            <Col md={4} className="text-center" key={service.id}>
                                <img src={service.image} alt="Easy to Order" className="service-img mb-3" />
                                <div className="mx-auto service-content">
                                    <h3 className="fw-bold fs-4 py-2">{service.title}</h3>
                                    <p className="text-muted">{service.description}</p>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Services;
