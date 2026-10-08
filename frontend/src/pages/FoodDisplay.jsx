import React, { useContext, useState } from 'react'
import { StoreContext } from '../contexts/ContextAPI';
import DishCard from '../components/DishCard';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Toast } from 'react-bootstrap';
import '../style.css'
import { FcOk } from 'react-icons/fc';
import { menu_list, sortingOptions } from '../utils/data';

const FoodDisplay = () => {
    const { foodList, error } = useContext(StoreContext);
    const [show, setShow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "";

    const selectedCategory = menu_list.find((item) => item.menu_name === category);

    const filteredFoods = category ? foodList.filter(food => food.category === category)
        : [...foodList]; // the [...] means copy so we don't mutate the original array when sorting

    switch (sort) {
        case "asc":
            filteredFoods.sort((a, b) => a.price - b.price);
            break;

        case "desc":
            filteredFoods.sort((a, b) => b.price - a.price);
            break;

        default:
            // do nothing
            break;
    }

    /*
    const filteredFoods = (
        category
            ? foodList.filter(food => food.category === category)
            : [...foodList]
    ).sort((a, b) => {
        if (sort === "asc") return a.price - b.price;
        if (sort === "desc") return b.price - a.price;
        return 0; // Default Ordering. Comparator returns 0, so the copied array stays in its original order.
    });
    */

    const handleChange = (e) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("sort", value);
        } else {
            // Remove sort if Default Ordering is selected
            params.delete("sort");
        }

        setSearchParams(params);
    };

    if(error){
        return <Navigate to="/error" replace />;
    }

    return (
        <Container fluid className='bg-custom-color py-5'>
            <div className="text-center mb-4">
                <h2 className="heading-style mb-1">
                    {category || "Our Menu"}
                </h2>
                {selectedCategory?.availableText && (
                    <p className="heading-style fs-5 text-dark">
                        {selectedCategory.availableText}
                    </p>
                )}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2 translate-middle position-fixed start-50 z-3">
                <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide className='z-3 rounded-5 bg-transparent'>
                    <Toast.Body className='d-flex align-items-center justify-content-center text-center bg-dark bg-opacity-75 text-white glass rounded-5 p-2'> 
                        <FcOk className='me-2 fs-5' />Added To Plate</Toast.Body>
                </Toast>
            </div>

            <Container className='mb-5'>
                <hr className='text-dark pb-4' />
                <Row className='justify-content-between align-items-center mb-5'>
                    <div className='col-auto'>
                        <p className='fs-5 '>Showing 0 result</p>
                    </div>
                    <div className='col-auto '>
                        <Form.Select onChange={handleChange}>
                            {Object.entries(sortingOptions).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Row>
                <Row className="justify-content-center g-5">
                    {filteredFoods.map((items, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                            <DishCard key={items._id} itemObj={items} setShow={setShow} />
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </Container>
    )
}
export default FoodDisplay;