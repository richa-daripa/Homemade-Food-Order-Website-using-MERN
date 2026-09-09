import React from 'react'
import { Card, Form, Row, Col } from "react-bootstrap";
import { useWatch } from "react-hook-form";
import { ShieldCheck } from 'lucide-react';
import '../.././style.css'
import { paymentMethods } from '../../utils/data';

const PaymentSection = ({ register, errors, control }) => {

    const selectedPayment = useWatch({ control, name: "payment" });

    return (
        <Card className="shadow-sm border-0 rounded-4 mb-4 p-3">
            <Card.Body>
                <div className="d-flex align-items-center mb-4">
                    <ShieldCheck size={28} className="text-success me-2" />
                    <h4 className="mb-0">Payment Method</h4>
                </div>

                <p className="text-muted mb-4">
                    Choose your preferred payment option.
                </p>

                <Row className="g-3">
                    {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (

                            <Col md={12} key={method.id}>

                                {/* Hide the default radio button */}

                                <Form.Check
                                    type="radio"
                                    id={method.id}
                                    value={method.value}
                                    className="d-none"
                                    {...register("payment", {
                                        required: "Please select a payment method"
                                    })}
                                />

                                {/* Clicking the card selects the radio */}

                                <Form.Label htmlFor={method.id} className="w-100">
                                    <Card className={`shadow-sm rounded-3 border ${selectedPayment === method.value
                                        ? "bg-warning-subtle"
                                        : "payment-card"
                                        }`}
                                    >
                                        <Card.Body>
                                            <div className="d-flex align-items-center">
                                                <Icon size={20} className='me-2'/>
                                                <h6 className="mb-1">{method.title}</h6>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Form.Label>
                            </Col>
                        );
                    })}
                </Row>

                {errors.payment && (
                    <small className="text-danger mt-3 mb-0">{errors.payment.message}
                    </small>
                )}
            </Card.Body>
        </Card>
    )
}

export default PaymentSection