import React from 'react'
import { useEffect, useState } from 'react';
import { Badge, Card, Container, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthConfig } from '../utils/authAxios';
import { formateOrderDate, getOrderStatus } from '../utils/formatting';
import axios from 'axios';
import { deliveryFee, GST, packagingFee } from '../utils/constants';
import { Info } from 'lucide-react';
import { ORDER_API_URL } from '../services/api';
import '../style.css';

const ViewOrderDetails = () => {
    const { orderId } = useParams();

    const { user } = useAuth();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const viewOrder = async () => {
        try {
            const config = await getAuthConfig(user);

            const response = await axios.get(`${ORDER_API_URL}/${orderId}`,
                config
            )
            setOrder(response.data.data);

        } catch (error) {
            console.error("Error fetching order's details from backend:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        viewOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center text-secondary">
                Loading your order details...
            </div>
        )
    }

    if (error) {
        return <Navigate to="/error" replace />;
    }

    const { firstName, lastName, address1, address2, city, pincode, phone } = order.deliveryAddress || {};
    const statusUI = getOrderStatus(order.status);
    const StatusIcon = statusUI.icon;

    return (
        <Container className="my-4 py-3">
            <Card className="border-0 shadow-sm mx-auto container-width" >
                <Card.Body>
                    <Card className="mb-3 border-0 bg-body-tertiary">
                        <Card.Header className={`${statusUI.className}`}>
                            <h4 className='my-0 py-2 d-flex align-items-center gap-3'>
                                <StatusIcon size={42} color={statusUI.color} />{order.status}</h4>
                        </Card.Header>
                        <Card.Body>
                            <small className="d-block mb-2 text-secondary">{order.items.length} items in order</small>
                            <ListGroup as="ul" variant='flush'>
                                {order.items.map((item, index) => (
                                    <ListGroup.Item key={index} as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            {item.name}
                                            <small className='text-secondary ms-2'>x {item.quantity}</small>
                                        </div>
                                        <span className='fw-semibold'>₹ {item.unitPrice}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className="d-flex align-items-center gap-2">
                                    <h5 className='mb-0'>Total Bill</h5>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip >
                                                <div className="text-start m-1">
                                                    <small className='d-block mb-2 text-secondary'>Inclusive of below charges: </small>
                                                    <div className="d-flex justify-content-between gap-4">
                                                        <span>Delivery Partner Fee</span>
                                                        <span>₹ {deliveryFee}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between gap-4">
                                                        <span>GST</span>
                                                        <span>₹ {GST}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between gap-4">
                                                        <span>Packaging Charge</span>
                                                        <span>₹ {packagingFee}</span>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <span className='text-secondary'>
                                            <Info size={14} />
                                        </span>
                                    </OverlayTrigger>
                                </div>

                                <strong className='fs-5 fw-semibold'>₹ {order.amount}</strong>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3 border-0 bg-body-tertiary">
                        <Card.Body>
                            <Card.Title>Order Details</Card.Title>
                            <div>
                                <small className="text-secondary d-block">Order ID</small>
                                <span>#OD{order._id}</span>
                            </div>
                            <div className='my-4'>
                                <small className="text-secondary d-block">
                                    Delivery To
                                </small>
                                <div>
                                    <span className='fw-medium text-muted'>
                                        {firstName} {lastName}
                                    </span>
                                    <br />
                                    {address1} {address2 && `, ${address2}`}, {city} - {pincode}
                                    <br />
                                    <span className='text-muted'>
                                        Mobile: {phone}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <small className="text-secondary d-block">Order Placed at</small>
                                <span>{formateOrderDate(order.orderedAt)}</span>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="border-0 bg-body-tertiary">
                        <Card.Body className="p-3 p-md-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Card.Title className="mb-0">
                                    Payment Status
                                </Card.Title>
                                <Badge
                                    className={`px-3 py-2 fw-medium ${order.paymentStatus === "Paid"
                                        ? "bg-success-subtle text-success"
                                        : "bg-danger-subtle text-danger"
                                        }`}
                                >
                                    {order.paymentStatus}
                                </Badge>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <small className="text-secondary d-block">
                                        Payment Method
                                    </small>
                                    <span>
                                        {order.paymentMethod}
                                    </span>
                                </div>
                                <div className="text-end">
                                    <small className="text-secondary d-block">
                                        {
                                            order.paymentStatus === 'Paid' ? "Amount Paid" : "Amount To Pay"
                                        }
                                    </small>
                                    <span className="fw-semibold">
                                        ₹ {order.amount}
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ViewOrderDetails