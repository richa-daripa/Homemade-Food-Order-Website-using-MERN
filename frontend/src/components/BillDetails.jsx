import { React, useContext } from 'react'
import { StoreContext } from "../contexts/ContextAPI";
import { Alert, Button, Card, Col } from "react-bootstrap";
import '../style.css'
import { Link } from "react-router-dom";
import { ChefHat, ReceiptIndianRupee } from "lucide-react";
import { CHARGES_AND_TAXES, deliveryFee, foodPreparationInfo, GST, packagingFee } from "../utils/constants";

const BillDetails = () => {
    const { getTotalAmount, totalQuantity } = useContext(StoreContext);
    const total = getTotalAmount() + CHARGES_AND_TAXES;

    return (
        <Col md={5} lg={4}>
            <Card className="border-warning border-2 rounded-4 shadow">
                <Card.Body>
                    <Card.Title className="fs-4 pb-3 custom-border">
                        <ReceiptIndianRupee size={32} className="text-success me-2" />
                        <span className="text-secondary fs-6">BILL DETAILS</span>
                    </Card.Title>

                    <div className="d-flex justify-content-between custom-border2 py-2">
                        <p className="my-0">Subtotal</p>
                        <span>₹ {getTotalAmount()} </span>
                    </div>
                    <div className="d-flex justify-content-between custom-border2 py-2">
                        <p className="my-0">Delivery Partner Fee</p>
                        <span>₹ {deliveryFee}</span>
                    </div>
                    <div className="d-flex justify-content-between custom-border2 py-2">
                        <p className="my-0">GST </p>
                        <span>₹ {GST}</span>
                    </div>
                    <div className="d-flex justify-content-between custom-border pt-2">
                        <p>Packaging Charge</p>
                        <span>₹ {packagingFee}</span>
                    </div>

                    <div className="d-flex justify-content-between fs-5 fw-bold pt-2">
                        <span>Order Total</span>
                        <span>₹{total}</span>
                    </div>
                    <Button className="w-100 mt-4 custom-button-color" as={Link} to="/checkout">
                        Proceed to Checkout
                    </Button>
                </Card.Body>
            </Card>

            <Alert variant="warning" className="border-0 rounded-3 mt-3">
                <div className="d-flex">
                    <ChefHat size={32} className="me-3 mt-1" />
                    <div>
                        <h6 className="fw-bold mb-1">Freshly Prepared</h6>
                        <small className="text-muted">
                            {foodPreparationInfo}
                        </small>
                    </div>
                </div>
            </Alert>
        </Col>
    )
}

export default BillDetails