import React from 'react'
import { Alert, Card, ListGroup, Button, Form, Badge } from "react-bootstrap";
import { BadgeInfo, Clock3, ReceiptIndianRupee } from "lucide-react";
import { CHARGES_AND_TAXES } from '../../utils/constants';

const BillSummary = ({ totalItems, subtotal }) => {

    const total = subtotal + CHARGES_AND_TAXES;

    return (
        <Card className="shadow-sm rounded-4 border-0 p-3">
            <Card.Body>
                <div className="d-flex align-items-center mb-4">
                    <ReceiptIndianRupee size={26} className="me-2 text-success" />
                    <h4 className="mb-0">Bill Summary</h4>
                </div>

                <ListGroup variant="flush">

                    <ListGroup.Item className="d-flex justify-content-between">
                        <span>Food Items</span>
                        <strong>{totalItems}</strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="d-flex justify-content-between">
                        <span> Item Total</span>
                        <strong> ₹{subtotal}</strong>
                    </ListGroup.Item>

                    <ListGroup.Item className="d-flex justify-content-between">
                        <span>
                            <div>
                                Total Bill
                            </div>
                            <small className='text-secondary text-opacity-75'>Inclusive of taxes and charges</small>
                        </span>
                        <strong>₹{total}</strong>
                    </ListGroup.Item>
                </ListGroup>

                <hr />

                <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>To Pay</span>
                    <span>₹{total}</span>
                </div>

                <Card className="mt-4 bg-warning-subtle border-0">
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <Clock3 className="me-2 text-warning" />
                            <div>
                                <small className="text-muted">Estimated Delivery</small>
                                <div className="fw-semibold">45 - 50 mins</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    )
}

export default BillSummary