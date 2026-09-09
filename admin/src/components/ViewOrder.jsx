import React from 'react'
import { Card, ListGroup, Modal } from 'react-bootstrap'

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

                        <Card.Text className='border-bottom pb-1 border-2'>
                            <strong className="d-block mb-2">
                                Items Ordered
                            </strong>

                            <ListGroup variant="flush">
                                {
                                    selectedOrder?.items?.map(order => (
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div>{order.name}</div>
                                                <small className='text-secondary'>Qty: {order.quantity}</small>
                                            </div>
                                            <span>{order.unitPrice}</span>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Card.Text>
                        <Card.Text >
                            <strong className="d-block mb-2">
                                Delivery To
                            </strong>
                            <div >
                                <span>
                                    {firstName + " " + lastName}
                                </span>
                                <br />
                                {address1}, {address2 && `, ${address2}`} {city} - {pincode}
                                <br />
                                <span>
                                    Phone: {phone}
                                </span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>

        </Modal>
    )
}

export default ViewOrder