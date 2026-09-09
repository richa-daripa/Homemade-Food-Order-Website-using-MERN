import { React, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../../contexts/ContextAPI';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import '../.././style.css'
import { CircleUser, LogOut, Menu, Utensils, PaperBag, UserRound } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { navLinks } from '../../utils/formatting';

const MobileMenu = ({openLogin}) => {
  const { totalQuantity } = useContext(StoreContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { user, logout } = useAuth();

  const cartTotal = totalQuantity();

  const openMobileMenu = () => setShowOffcanvas(true);
  const closeMobileMenu = () => setShowOffcanvas(false);


  return (
    <>
    <Offcanvas show={showOffcanvas} onHide={closeMobileMenu} placement="end" className="text-bg-dark w-75">
      <Offcanvas.Header closeButton data-bs-theme="dark" className='border-bottom'>
        <Offcanvas.Title className='d-flex align-items-center'>
          {user ? (
            <>
              <CircleUser size={28} color="grey" className="me-2" />Welcome, {user?.displayName}</>
          ) : (
            <h3 className='ms-2'>Welcome to Eatzio</h3>
          )}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Nav className="flex-column ms-2 gap-2" onClick={closeMobileMenu}>
          {
            navLinks.map(({ to, label, icon: Icon, end }) => (
              <Nav.Link as={NavLink} key={to} to={to} end={end} className="text-warning border border-secondary ps-3 rounded d-flex align-items-center">
                <Icon size={18} className='me-2' />{label}
              </Nav.Link>
            ))
          }

          {user ? (
            <>
              <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center text-warning border border-secondary ps-3 rounded"><Utensils size={18} className='me-2' />My Plate
                <span className="badge text-bg-warning ms-2">
                  {cartTotal}
                </span>
              </Nav.Link>
              <Nav.Link as={Link} to="/myOrders" className="text-warning border border-secondary ps-3 rounded d-flex align-items-center"><PaperBag size={18} className='me-2' />My Orders</Nav.Link>
              <Nav.Link href="#profile" className="text-warning border border-secondary ps-3 rounded d-flex align-items-center"><UserRound size={18} className='me-2' />Profile</Nav.Link>
              <Nav.Link className="text-warning border border-secondary ps-3 rounded d-flex align-items-center" onClick={logout}><LogOut size={18} className='me-2' />Log Out</Nav.Link>
            </>
          ) : (
            <Button className="custom-button-color" onClick={openLogin}>
              Login
            </Button>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
    <Menu className='d-flex d-lg-none fs-2 text-secondary' onClick={openMobileMenu} />
    </>
  )
}

export default MobileMenu