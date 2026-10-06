import React, { useEffect } from 'react'
import { Button, Container, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import '../style.css'
import { useState } from 'react'
import axios from 'axios'
import { MdViewList } from "react-icons/md";
import { toast } from 'react-toastify';
import { formateOrderDate } from '../../../frontend/src/utils/formatting'
import ViewOrder from '../components/ViewOrder'
import { ADMIN_ORDERS_API_URL } from '../util/api'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${ADMIN_ORDERS_API_URL}/`);
      setOrders(response.data.data);
    } catch (error) {
      toast.error("Error fetching orders from backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handlePaymentStatus = async (orderId, status) => {
    try {
      await axios.put(`${ADMIN_ORDERS_API_URL}/${orderId}/payment-status`,
        { status: status }
      );

      setOrders((prev) => (
        prev.map(order => (
          order._id === orderId
            ? { ...order, status }
            : order
        ))
      ));
      toast.success(`Payment status updated for Order No.: ${orderId}`)
    } catch (error) {
      toast.error("Error updating payment status");
    }
  }

  const handleOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${ADMIN_ORDERS_API_URL}/${orderId}/order-status`,
        { status: status }
      );
      setOrders((prev) => (
        prev.map(order => (
          order._id === orderId
            ? { ...order, status }
            : order
        ))
      ));
      toast.success(`Order status updated for Order No.: ${orderId}`)
    } catch (error) {
      toast.error("Error updating order status");
    }
  }

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewOrderModal(true);
  }

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <p className="text-secondary">
          Loading orders...
        </p>
      </Container>
    )
  }

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container fluid className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 >Customer Orders</h3>
          <Form.Control type="search" placeholder="Search orders by ID..." className='w-25'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <Table bordered size="sm">
          <thead className='text-center'>
            <tr>
              <th>Order ID</th>
              <th>Ordered At</th>
              <th>Food Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>#{order._id}</td>
                <td>{formateOrderDate(order.orderedAt)}</td>
                <td>{order.items.length}</td>
                <td>₹ {order.amount.toFixed(2)}</td>
                <td>
                  <Form.Select value={order.paymentStatus} size='sm'
                    disabled={order.paymentMethod !== "Cash on Delivery" ||
                      order.paymentStatus === "Paid"
                    }
                    onChange={(e) => handlePaymentStatus(order._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select value={order.status} size='sm'
                    disabled={order.status === "Order Delivered"}
                    onChange={(e) => handleOrderStatus(order._id, e.target.value)}>
                    <option value="Food is Preparing">Food is Preparing</option>
                    <option value="Out_for Delivery">Out for Delivery</option>
                    <option value="Order Delivered">Order Delivered</option>
                  </Form.Select>
                </td>
                <td>
                  <div className='d-flex justify-content-center gap-2'>
                    <OverlayTrigger placement='top' overlay={<Tooltip>View Order</Tooltip>}>
                      <Button className='bg-transparent text-dark border-0' onClick={() => handleView(order)}>
                        <MdViewList size={20} />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </Container>
      <ViewOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}
        setViewOrderModal={setViewOrderModal} viewOrderModal={viewOrderModal} />
    </>
  )
}

export default Orders