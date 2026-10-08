import React from 'react'
import { Card, ListGroup, Modal } from 'react-bootstrap'
import { deliveryFee, GST, packagingFee } from '../../../frontend/src/utils/constants';

const ViewOrder = ({ selectedOrder, setSelectedOrder, setViewOrderModal, viewOrderModal }) => {

    const handleViewClose = () => {
        setSelectedOrder({});
        setViewOrderModal(false);
    }
    const { firstName, lastName, address1, address2, city, pincode, phone } = selectedOrder.deliveryAddress || {};

    return (
        <Modal centered show={viewOrderModal} onHide={handleViewClose}>
            <Modal.Body>
                <Card>
                    <Card.Header>
                        <strong>Order ID: </strong>
                        <span>#OD{selectedOrder._id}</span>
                    </Card.Header>
                    <Card.Body>
                        <div className='border-bottom pb-1 border-2'>
                            <strong className="d-block mb-2">Items Ordered</strong>
                            <ListGroup variant="flush">
                                {selectedOrder?.items?.map((order,index)=> (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div>{order.name}</div>
                                            <small className='text-secondary'>Qty: {order.quantity} x ₹{order.unitPrice}</small>
                                        </div>
                                        <span>₹ {order.unitPrice * order.quantity}</span>
                                    </ListGroup.Item>
                                ))
                                }
                                <ListGroup.Item className="d-flex justify-content-between align-items-start border-top border-2 border-secondary rounded">
                                    <div className="ms-2 me-auto">
                                        <div className='fw-semibold'>Total Amount:</div>
                                        <small className='text-secondary'>DeliveryFee: ₹{deliveryFee}, GST: ₹{GST}, PackagingFee: ₹{packagingFee}</small>
                                    </div>
                                    <span>₹ {selectedOrder.amount}</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        {selectedOrder.specialInstructions?.length > 0 && (
                            <div >
                                <strong className="d-block mb-2">Special Instruction</strong>
                                <ul>
                                    {selectedOrder.specialInstructions.map((info, index) => (
                                        <li key={index}>{info}</li>
                                    )
                                    )}
                                </ul>
                            </div>
                        )}
                        <hr />
                        <div>
                            <strong className="d-block mb-2"> Delivery To </strong>
                            <div >
                                <span>{firstName + " " + lastName}</span>
                                <br />
                                {address1}, {address2 && `, ${address2}`} {city} - {pincode}
                                <br />
                                <span>Phone: {phone}</span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default ViewOrder