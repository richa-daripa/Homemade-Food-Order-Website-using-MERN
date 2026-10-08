import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../style.css'
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MapPin, Mail, Phone } from "lucide-react"
import { address, mailID, phoneNo, thankYouNote } from '../utils/constants';

const Footer = () => {
    return (
        <div className="footer text-secondary bg-dark pt-5 px-5">
            <Container>
                <Row className="gy-4">

                    <Col md={4} >
                        <img src={logo} alt="Eatzio Logo" width="120" />
                        <p className="mt-3">{thankYouNote}</p>
                        <div className="d-flex gap-4 fs-3">
                            <FaFacebook />
                            <FaInstagram />
                            <FaXTwitter />
                            <FaWhatsapp />
                        </div>
                    </Col>

                    <Col md={2} className='ms-md-5'>
                        <h5 className="text-white">Explore</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2 hover-link ">Blogs</li>
                            <li className="mb-2 hover-link ">Terms & Conditions</li>
                        </ul>
                    </Col>


                    <Col md={2}>
                        <h5 className="text-white">We Deliver At</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2 ">Chennai</li>
                            <li className="mb-2 ">Hyderabad</li>
                            <li className="mb-2 ">Mumbai</li>
                            <li className="mb-2 ">Bengaluru</li>
                        </ul>
                    </Col>


                    <Col md={3}>
                        <h5 className="text-white">Get In Touch</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Phone className="me-2" />{phoneNo}
                            </li>
                            <li className="mb-2">
                                <Mail className="me-2" />{mailID}
                            </li>
                            <li >
                                <MapPin className="me-2" />{address}
                            </li>
                        </ul>
                    </Col>
                </Row>

                <hr className="border-secondary mt-4" />
                <p className="d-flex align-items-center justify-content-center p-0 m-0 py-2">&copy; 2024 Eatzio.com | All rights reserved.</p>
            </Container>
        </div>
    );
};

export default Footer;