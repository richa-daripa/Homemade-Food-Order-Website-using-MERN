import React from 'react'
import { Card, Modal } from 'react-bootstrap'

const ViewOrder = ({ selectedOrder, setSelectedOrder, setViewOrderModal, viewOrderModal }) => {

    const handleViewClose = () => {
        setSelectedOrder({});
        setViewOrderModal(false);
    }
    const { firstName, lastName, address1, address2, city, pincode, phone } = selectedOrder.deliveryAddress || {};
    
    return (
        <Modal centered show={viewOrderModal} onHide={handleViewClose}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Text>
                                <small className="text-secondary d-block">Order ID</small>
                                <span>#OD{selectedOrder._id}</span>
                            </Card.Text>
                        <Card.Text>
                            <small className="text-secondary d-block">
                                Ship To
                            </small>
                            <div >
                                <span className='fw-medium text-muted'>
                                    {firstName+" "+lastName}
                                </span>
                                <br />
                                {address1}, {address2 && `, ${address2}`} {city} - {pincode}
                                <br />
                                <span className='text-muted'>
                                    Mobile: {phone}
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