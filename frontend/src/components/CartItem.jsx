import { StoreContext } from "../contexts/ContextAPI";
import { useContext } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { SquarePlus, SquareMinus, Trash2 } from 'lucide-react';
import { IMAGE_URL } from "../utils/constants";

const CartItem = ({ itemObj }) => {
    const { cartItems, addToCart, removeFromCart, handleDeleteConfirm } = useContext(StoreContext);
    const { _id, name, image, price, description } = itemObj;

    // Find the corresponding cart item
    const cartItem = cartItems.find(item => item.foodId === _id);

    const quantity = cartItem?.quantity || 0;

    return (
        <ListGroup.Item className="border rounded-2 p-3">
            <Row className="align-items-center g-3">
                <Col xs={6} md="auto" className="text-center">
                    <img src={`${IMAGE_URL}/${image}`} alt="" width="160" height="140" className="img-fluid" />
                </Col>
                <Col xs={6} md={4}>
                    <h5 >{name}</h5>
                    <p className="text-secondary d-block text-wrapping fs-6">{description}</p>
                    <span className="d-block fs-5">₹ {price}</span>
                </Col>
                <Col xs={6} md className=" d-flex justify-content-center align-items-center ">
                    <Button className="bg-transparent border-0 text-secondary">
                        <SquareMinus size={28} onClick={() => removeFromCart(_id)} />
                    </Button>
                    <span className="mx-2 text-center">Qty {quantity}</span>
                    <Button className="bg-transparent border-0 text-secondary" onClick={() => addToCart(_id)}>
                        <SquarePlus size={28} />
                    </Button>
                </Col>
                <Col xs={6} md="auto" className="text-center">
                    <Button className="bg-transparent border-0 text-danger" onClick={() => handleDeleteConfirm(itemObj)}>
                        <Trash2 size={20} />
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}
export default CartItem;