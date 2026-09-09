import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FOOD_API_URL, IMAGE_URL } from '../util/constants';
import { Button, Card, Col, Container, Row, Spinner, Badge, } from "react-bootstrap";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Foods = () => {

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = async () => {
        try {
            const response = await axios.get(`${FOOD_API_URL}/`);
            setFoods(response.data.data);
        } catch (err) {
            console.log("Error fetching data from backend");
            setFoods([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFoods();
    }, [])

    if (loading) {
        return (
            <div className='text-center mt-5'>
                <Spinner animation='border' variant='primary' />
            </div>
        )
    }

    const handleDelete = async (food_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food item?");

        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${FOOD_API_URL}/${food_id}`);
            //fetchFoods(); //If your backend modifies other data (e.g., sorting, timestamps), you can refetch else

            // Remove the deleted food from state
            setFoods((prev) =>
                prev.filter((food) => food._id !== food_id)
            );

            toast.success(response.data.message);
        } catch (error) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <Container fluid className="py-4">
            <div className='d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4'>
                <h3>Food Items</h3>
                <Button
                    variant="warning"
                    as={Link} to="/admin/foods/add"
                    className="d-flex align-items-center justify-content-center gap-2 rounded-3 fw-semibold shadow-sm opacity-75"
                >
                    <Plus size={20} />
                    <span>Add Food</span>
                </Button>
            </div>

            {foods.map((food) => (
                <Card key={food._id} className="shadow-sm border-0 rounded-4 mb-4">
                    <Card.Body>
                        <Row className="align-items-center">

                            <Col lg={2} md={3} sm={4} xs={12} className="text-center mb-3 mb-md-0">
                                <img
                                    src={`${IMAGE_URL}/${food.image}`}
                                    alt={food.name}
                                    className="img-fluid rounded-3 image-display"
                                />
                            </Col>

                            <Col lg={7} md={6} sm={8} xs={12}>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <h5 className="fw-semibold mb-0">{food.name}</h5>
                                    <Badge bg="warning" text="dark">
                                        {food.category}
                                    </Badge>
                                </div>

                                <p className="text-muted mb-2">{food.description}</p>
                                <h6 className="fw-semibold text-success fs-5">₹ {food.price}</h6>
                            </Col>
                            <Col lg={3} md={3} xs={12}
                                className="d-flex justify-content-md-end gap-2 mt-3 mt-md-0"
                            >
                                <Button variant="outline-info" as={Link}
                                    to={`/admin/foods/edit/${food._id}`}>
                                    <Pencil size={18} />
                                </Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(food._id)}><Trash2 size={18} /></Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )
}

export default Foods