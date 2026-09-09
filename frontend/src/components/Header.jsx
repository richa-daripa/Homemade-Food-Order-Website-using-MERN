import { Container, Row, Col } from 'react-bootstrap';
import '../style.css'
import { banner } from '../utils/constants';

const Header = () => {
    return (
        <div className="bg-image bg-img-custom-style d-flex align-items-center"> 
            <Container>
                <Row className="justify-content-start"> 
                    <Col xs={12} md={8} lg={6} className="text-white mx-width mt-5"> 
                        <h2 className="display-3 animation-1 mb-5">
                            Enjoy our <span className="text-custom">Delicious Homemade</span> Cuisine
                        </h2>
                        <p className="fs-5 animation-2">{banner}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Header;