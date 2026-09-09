import React from 'react'
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoodDisplay from './pages/FoodDisplay';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import './style.css'
import Cart from './pages/Cart';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import PaymentVerification from './pages/PaymentVerification';
import MyOrders from './pages/MyOrders';
import ViewOrderDetails from './pages/ViewOrderDetails';

function App() {
  const location = useLocation();
  const hide =
    matchPath("/order/:orderId", location.pathname) ||
    matchPath("/paymentSuccess", location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hide && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/menu' element={<FoodDisplay />} />
        <Route path='/order/:orderId' element={<Order />} />
        <Route path='/paymentSuccess' element={<PaymentVerification />} />
        <Route path='/myOrders' element={<MyOrders />} />
        <Route path="/myOrders/:orderId" element={<ViewOrderDetails />} />
      </Routes>
      {!hide && <Footer />}
    </>
  )
}

export default App
