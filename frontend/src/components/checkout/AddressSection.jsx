import React from 'react'
import { Card, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { MapPinned, Plus } from "lucide-react";

const AddressSection = ({ register, errors, user }) => {
    return (
        <Card className="shadow-sm border-0 rounded-4 mb-4 p-4">
            <Card.Body>
                <div className="d-flex align-items-center mb-4">
                    <MapPinned size={28} className="me-2 text-danger text-opacity-50" />
                    <h4 className="mb-0">Delivery Address</h4>
                </div>

                {/* Example Saved Address 
                <Card className="border mb-4 bg-light">
                    <Card.Body>

                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 className="fw-bold mb-1">Home</h6>
                                <small className="text-muted">
                                    24, Gandhi Street,
                                    Anna Nagar,
                                    Chennai - 600040
                                </small>
                            </div>

                            <Button variant="outline-warning"size="sm">
                                Deliver Here
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                <Button variant="outline-dark" className="mb-4">
                    <Plus size={18} className="me-2" /> Add New Address
                </Button>

                <hr />

                <h5 className="mb-4">New Delivery Address</h5>
                    */}
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John"
                                {...register("firstName", {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Z][a-zA-Z]+$/,
                                        message:"First letter should be capital"
                                    }
                                })}
                            />
                            <small className="text-danger">
                                {errors.firstName?.message}
                            </small>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Doe"
                                {...register("lastName", {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Z][a-zA-Z]+$/,
                                        message:"First letter should be capital"
                                    }
                                })}
                            />
                            <small className="text-danger">
                                {errors.lastName?.message}
                            </small>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" defaultValue={user?.email} readOnly disabled
                                {...register("email")}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                placeholder="House / Flat / Apartment"
                                {...register("address1", {
                                    required: "Address is required"
                                })}
                            />
                            <small className="text-danger">
                                {errors.address1?.message}
                            </small>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                                placeholder="Street / Area / Landmark"
                                {...register("address2")}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label> Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+91</InputGroup.Text>
                                <Form.Control
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Enter a valid 10-digit phone number"
                                        }
                                    })}
                                />
                            </InputGroup>
                            <small className="text-danger">
                                {errors.phone?.message}
                            </small>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("pincode", {
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Enter a valid pincode"
                                    }
                                })}
                            />
                            <small className="text-danger">
                                {errors.pincode?.message}
                            </small>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Select
                                defaultValue=""
                                {...register("city", {
                                    required: "Select a city"
                                })}
                            >
                                <option value="" disabled>Select City </option>
                                <option>Chennai</option>
                                <option>Mumbai</option>
                                <option>Hyderabad</option>
                                <option>Bengaluru</option>
                            </Form.Select>
                            <small className="text-danger">
                                {errors.city?.message}
                            </small>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AddressSection