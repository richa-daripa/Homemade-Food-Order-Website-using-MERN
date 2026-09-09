import { StoreContext } from "../contexts/ContextAPI";
import { useContext } from "react";
import { Container, ListGroup, Button, Col, Row, Modal, ModalFooter } from "react-bootstrap";
import '../style.css'
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import cooking_food from '../assets/img4.png';
import BillDetails from "../components/BillDetails";
import { IMAGE_URL } from "../utils/constants";

const Cart = () => {
    const { cartItems, foodList, handleDelete, deleteItem, handleDeleteCancel } = useContext(StoreContext);

    if (cartItems.length === 0) {
        return (
            <Container className="vh-100" >
                <div className="py-5 text-center">
                <img src={cooking_food} alt="" width="200" className="mt-5" />
                <h4 className=" mt-5">Good Food is Always Cooking</h4>
                <p className="text-secondary">Your plate is empty. Add your favourite food items from the menu.</p>
                <Button variant="warning" className="mt-5" as={Link} to="/menu">
                    Browse Menu
                </Button>
                </div>
                
            </Container>
        )
    }

    return (
        <div className='pb-5'>
            <h2 className='text-center mb-5 bg-warning bg-opacity-50 my-4 p-2'>Your Plate</h2>
            <Container className="py-4">
                <Row className="g-5">
                    <Col md={7} lg={8} >
                        {/*<h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span >Food Items </span>
                                        <span className="badge fs-5 bg-warning-subtle text-dark">{totalQuantity()}</span>
                                    </h4>*/}
                        <h4 className="mb-3">Food Items</h4>
                        <ListGroup className="d-grid gap-2">
                            {foodList.filter((item) =>
                                cartItems.find((cartItem) => cartItem.foodId === item._id))
                                .map((item) => (
                                    <CartItem key={item._id} itemObj={item} />
                                ))
                            }
                        </ListGroup>
                    </Col>
                    <BillDetails />
                </Row>
            </Container>

            <Modal show={deleteItem !== null} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className="d-flex flex-column gap-3 p-3 mt-2 mx-2">
                    <Row className="align-items-center">
                        <div className="col-12 col-md-4 mb-3 mb-md-0 text-center">
                            <img src={`${IMAGE_URL}/${deleteItem?.image}`} alt="Item to be removed" className="img-fluid" width="150px" height="120px" />
                        </div>
                        <div className="col-12 col-md-8 d-grid gap-3">
                            <h5>Remove from Plate?</h5>
                            <p>Are you sure you want to remove this food item from your plate?</p>
                        </div>
                    </Row>
                </Modal.Body>

                <ModalFooter className="flex-nowrap p-0">
                    <Button className="bg-transparent text-secondary border-0 col-6 py-3 m-0 rounded-0 border-end" onClick={handleDeleteCancel} >
                        Cancel
                    </Button>
                    <Button className="bg-transparent text-danger border-0 col-6 py-3 m-0 rounded-0" onClick={handleDelete}>
                        Remove
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default Cart;