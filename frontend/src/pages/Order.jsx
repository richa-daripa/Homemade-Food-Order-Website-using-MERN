import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { CalendarDays, CircleCheckBig, CreditCard, House, IndianRupee, Phone, Ticket, User } from "lucide-react";
import { CHARGES_AND_TAXES, IMAGE_URL, ORDER_API_URL } from "../utils/constants";
import '../style.css'
import { useAuth } from "../hooks/useAuth";
import { getAuthConfig } from "../utils/authAxios";
import axios from 'axios';
import { formateOrderDate } from "../utils/formatting";

const Order = () => {
    const { orderId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const config = await getAuthConfig(user);

            const response = await axios.get(`${ORDER_API_URL}/order-confirmation/${orderId}`,
                config
            );
            setOrderData(response.data.data);

        } catch (error) {
            console.log("Error fetching order details from backend:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [orderId])

    const handleClick = () => {
        navigate('/');
    }

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center text-secondary">
                Loading your order...
            </div>
        )
    }

    return (
        <div className="bg-warning-subtle">
            <Container className="py-5">
                <Card className="bg-success text-white mb-4">
                    <Card.Header className=" text-center py-5 border-0">
                        <CircleCheckBig size={50} />
                        <h2 className="mt-3 mb-2">Order Confirmed!</h2>
                        <p className="mb-0">
                            Thank you for ordering with us. Your food is being prepared.
                        </p>
                    </Card.Header>
                </Card>

                <Row className="g-4 mb-4">
                    <Col md={6}>
                        <Card className="h-100 rounded-4">
                            <Card.Body >
                                <Card.Title className="m-3">Order Details</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2 text-secondary">
                                            <Ticket size={18} className="flex-shrink-0" />
                                            <span>Order ID</span>
                                        </div>
                                        <span className="fw-semibold">{orderId}</span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2 text-secondary">
                                            <CalendarDays size={18} className="flex-shrink-0" />
                                            <span>Date of Order Placed</span>
                                        </div>
                                        <span className="fw-semibold">{formateOrderDate(orderData.orderedAt)}</span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between gap-3 ">
                                        <div className="d-flex align-items-center gap-2 text-secondary ">
                                            <CreditCard size={18} className="flex-shrink-0" />
                                            <span>Payment Mode</span>
                                        </div>
                                        <span className="fw-semibold">{orderData.paymentMethod}</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="h-100 rounded-4">
                            <Card.Body>
                                <Card.Title className="m-3">Delivery Address</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item >
                                        <Row>
                                            <Col xs={2} md={1} className="text-secondary">
                                                <User size={18} />
                                            </Col>
                                            <Col>
                                                {orderData.deliveryAddress.firstName} {orderData.deliveryAddress.lastName}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col xs={2} md={1} className="text-secondary">
                                                <Phone size={18} />
                                            </Col>
                                            <Col>
                                                +91 {orderData.deliveryAddress.phone}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col xs={2} md={1} className="text-secondary">
                                                <House size={18} />
                                            </Col>
                                            <Col>
                                                {orderData.deliveryAddress.address1}, {orderData.deliveryAddress.address2},
                                                {orderData.deliveryAddress.city} - {orderData.deliveryAddress.pincode}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card className="mb-4 rounded-4">
                    <Card.Body>
                        <Card.Title className="m-3"> Order Summary</Card.Title>
                        <ListGroup variant="flush" as="ul" className="custom-list">
                            {orderData.items.map((item) => (
                                <ListGroup.Item key={item.foodId} as="li">
                                    <div className="d-flex align-items-center gap-3">
                                        {/*<img
                                            src={`${IMAGE_URL}/${item.image}`}
                                            width={80}
                                            height={60}
                                            className="d-none d-md-block rounded-3"
                                        />*/}
                                        <div className="row flex-grow-1 align-items-center g-0">
                                            <div className="col-4">
                                                <span className="fw-semibold">{item.name}</span>
                                            </div>

                                            <div className="col-4 text-center text-secondary">
                                                Qty: {item.quantity}
                                            </div>

                                            <div className="col-4 text-end fw-semibold">
                                                ₹ {(item.unitPrice * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item >
                                <div className="d-flex justify-content-between">
                                    <span className="text-secondary">
                                        Charges & Taxes
                                    </span>
                                    <span className="fw-semibold">
                                        ₹ {CHARGES_AND_TAXES.toFixed(2)}
                                    </span>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>

                        <Card className="rounded-4 border-0 bg-success-subtle my-4">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <IndianRupee size={28}
                                        className="bg-success rounded-3 p-1 text-white flex-shrink-0 me-2"
                                    />
                                    <span className="fw-semibold fs-5">
                                        {
                                            orderData.paymentMethod === 'Cash on Delivery' ? "Amount To Pay" : "Amount Paid"
                                        }
                                    </span>
                                </div>

                                <span className="fw-bold fs-5 text-success text-nowrap">
                                    {orderData.amount.toFixed(2)}
                                </span>

                            </Card.Body>
                        </Card>

                        <div className="m-3">
                            <h6 className="fw-semibold">Cooking Instructions :</h6>
                            {orderData.specialInstructions.length === 0 ? (
                                <p>None</p>
                            ) : (
                                <ul>
                                    {orderData.specialInstructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))
                                    }
                                </ul>
                            )
                            }
                        </div>
                    </Card.Body>
                </Card>

                <div className="text-center">
                    <Button variant="success" className="border-0 fw-semibold shadow" onClick={handleClick}>
                        HOME
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Order;