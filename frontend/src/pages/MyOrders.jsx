import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useEffect } from 'react';
import { getAuthConfig } from '../utils/authAxios';
import { ORDER_API_URL } from '../services/api';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { formateOrderDate, getOrderStatus } from '../utils/formatting';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import empty_order from "../assets/img6.png";

const MyOrders = () => {

    const [orderList, setOrderList] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchOrders = async () => {
        try {
            const config = await getAuthConfig(user);

            const response = await axios.get(`${ORDER_API_URL}/`,
                config
            )
            setOrderList(response.data.data);
        } catch (error) {
            console.error("Error fetching orders list from backend:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return (
            <Container className="vh-100 d-flex justify-content-center align-items-center">
                <p className="text-secondary">
                    Loading your orders...
                </p>
            </Container>
        )
    }

    if (error) {
        return <Navigate to="/error" replace />;
    }

    if (orderList.length === 0) {
        return (
            <Container className="vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <img src={empty_order} alt="" width="250" />
                    <h3>No orders yet!</h3>
                    <p className="text-secondary">
                        Place your first order and let the flavors come to you.
                    </p>
                    <Button as={Link} variant='warning' to="/menu" className='mt-3'>
                        Order Now
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-3">
            <h2 className="my-4 px-4">My Orders</h2>
            <Container fluid>
                {orderList.map((order) => {
                    // Get the icon, color and background based on order.status
                    const statusUI = getOrderStatus(order.status);
                    const StatusIcon = statusUI.icon;

                    return (
                        <Card key={order._id} className='my-4 shadow-sm'>
                            <Card.Header className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2">
                                <h6>#OD{order._id.toString().slice(0, 13).toUpperCase()}</h6>

                                <div className="d-flex align-items-center text-secondary">
                                    <CalendarClock size={18} className="me-2" />
                                    <small>{formateOrderDate(order.orderedAt)}</small>
                                </div>
                            </Card.Header>

                            <Card.Body>
                                <Row className="g-3 align-items-md-center">
                                    <Col xs={12} md={4}>
                                        {order.items.slice(0, 2).map((item, index) => (
                                            <div key={index}>
                                                {item.name} × {item.quantity}
                                            </div>
                                        ))}

                                        {order.items.length > 2 && (
                                            <small className="text-secondary">
                                                + {order.items.length - 2} more dishes
                                            </small>
                                        )}
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <small className="text-secondary d-block">
                                            Total Amount
                                        </small>
                                        <span className="fw-medium">
                                            ₹ {order.amount.toFixed(2)}
                                        </span>
                                    </Col>

                                    <Col xs={12} md={3}>
                                        <div 
                                        className={`d-flex align-items-center gap-3 px-4 py-2 rounded justify-content-center ${statusUI.className}`}>
                                            <StatusIcon color={statusUI.color} size={30} />
                                            <strong>{order.status.toUpperCase()}</strong>
                                        </div>
                                    </Col>

                                    <Col xs={12} md={3} className="d-flex justify-content-md-end">
                                        <Button
                                            as={Link}
                                            to={`/myOrders/${order._id}`}
                                            variant="outline-warning"
                                            className="text-dark fw-medium"
                                        >
                                            View Order
                                            <ChevronRight size={18} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </Container>
    )
}

export default MyOrders