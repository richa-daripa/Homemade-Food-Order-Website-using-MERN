import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Card, Container, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { StoreContext } from '../contexts/ContextAPI';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import preparing_food from '../assets/img5.jpg';
import Confetti from "react-confetti-boom";
import AddressSection from '../components/checkout/AddressSection';
import PaymentSection from '../components/checkout/PaymentSection';
import BillSummary from '../components/checkout/BillSummary';
import SpecialInstructions from '../components/checkout/SpecialInstructions';
import { cancellationPolicy, ORDER_API_URL } from '../utils/constants';
import { getAuthConfig } from '../utils/authAxios';
import axios from 'axios';

const Checkout = () => {
    const { getTotalAmount, totalQuantity, setCartItems } = useContext(StoreContext);
    const { user } = useAuth();
    const [showPlacedOrder, setShowPlacedOrder] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState()

    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if (data.payment === "Online Payment") {
                setLoadingMsg("Redirecting to payment...");
            } else {
                setLoadingMsg("Placing order...");
            }

            const config = await getAuthConfig(user);

            const orderData = {
                deliveryAddress: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    address1: data.address1,
                    address2: data.address2,
                    city: data.city,
                    pincode: data.pincode
                },
                specialInstructions: [
                    ...(data.specialInstructions || []),
                    ...(data.otherInstruction ? [data.otherInstruction] : [])
                ].filter((instruction) => instruction !== "Other"),

                paymentMethod: data.payment
            };

            const response = await axios.post(`${ORDER_API_URL}/`,
                orderData,
                config
            );

            if (data.payment === "Online Payment") {
                window.location.href = response.data.url;
                return;
            }
            
            //for cod
            setCartItems([]);

            setShowPlacedOrder(true);

            const orderId = response.data.data._id;

            setTimeout(() => {
                setShowPlacedOrder(false);
                navigate(`/order/${orderId}`)
            }, 1000);

        } catch (error) {
            console.error("Order placement failed:", error);
        } finally {
            setLoading(false);
            setLoadingMsg("");
        }
    }

    return (
        <div className='bg-warning bg-opacity-50'>
            <Container className='py-3'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="g-3">
                        <Col md={7} lg={8} className='p-4'>
                            <AddressSection register={register} errors={errors} user={user} />
                            <SpecialInstructions register={register} setValue={setValue} />
                            <Alert variant="warning" className="border-0 rounded-3">
                                <div className='p-2'>
                                    <h6 className="fw-bold text-dark mb-1">Cancellation Policy</h6>
                                    <small className="text-muted text-justify">
                                        {cancellationPolicy}
                                    </small>
                                </div>
                            </Alert>
                        </Col>

                        <Col md={5} lg={4} className="p-4 rounded-4 ">
                            <PaymentSection register={register} errors={errors} control={control} />
                            <BillSummary totalItems={totalQuantity()} subtotal={getTotalAmount()} />
                            <Button className="w-100 mt-4 custom-button-color" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        {loadingMsg}
                                    </>
                                ) : (
                                    "Place Order"
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {showPlacedOrder && (
                    <Confetti
                        mode="boom"
                        particleCount={180}
                        colors={["#c60935", "#1c81e6", "#f9e67a", "#108914", "#ac2efb"]}
                        spreadDeg={120}
                        fadeOutHeight={600}
                    />
                )}

                <Modal show={showPlacedOrder} onHide={() => setShowPlacedOrder(false)} size="md" centered
                    contentClassName="bg-transparent border-0 shadow-none" >
                    <Modal.Body className="d-flex justify-content-center align-items-center" >

                        <Card className="shadow rounded-4 p-4 " style={{ width: "20rem", height: "30rem" }}>
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                                <Card.Title className='fs-3'>Order Placed!</Card.Title>
                                <Card.Text>Get ready to enjoy delicious homemade food</Card.Text>
                                <img src={preparing_food} alt="Food is preparing" width='250'></img>
                                <Button className="text-dark border-0 bg-transparent">Redirecting to your order...</Button>
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    )
}
export default Checkout;