import { React, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { StoreContext } from '../../contexts/ContextAPI';
import { Nav, Button, Dropdown, DropdownDivider } from 'react-bootstrap';
import '../.././style.css'
import { useAuth } from '../../hooks/useAuth';
import { CircleUser, LogOut, PaperBag, UserRound } from 'lucide-react';
import { navLinks } from '../../utils/formatting';

const DesktopMenu = ({ openLogin, openSignUp }) => {
    const { totalQuantity } = useContext(StoreContext);
    const { user, logout } = useAuth();

    return (
        <>
            <Nav variant="tabs" className="d-none d-lg-flex gap-4 mx-auto fs-5">
                {
                    navLinks.map(({ to, label, end }) => (
                        <Nav.Link as={NavLink} key={to} to={to} end={end} className='navbar-text-color'>{label}</Nav.Link>
                    ))
                }
            </Nav>

            <div className="d-none d-lg-flex gap-3 align-items-center">
                {
                    user ? (
                        <>
                            <Button variant="warning" as={Link} to="/cart" className="position-relative ">
                                My Plate
                                <span className="position-absolute top-0 start-100 translate-middle rounded-circle fw-bold d-flex align-items-center justify-content-center number-badge">
                                    {totalQuantity()}
                                </span>
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle as="span" className='custom-pointer'>
                                    <CircleUser size={35} color="grey" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" data-bs-theme="light">
                                    <p className='px-3'>Hi, {user?.displayName}</p>
                                    <DropdownDivider />
                                    <Dropdown.Item ><UserRound size={18} className='me-2' />Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/myOrders"><PaperBag size={18} className='me-2' />My Orders</Dropdown.Item>
                                    <DropdownDivider />
                                    <Dropdown.Item onClick={logout} className='d-flex align-items-center'>
                                        <LogOut size={18} className='me-2' />Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Button className="custom-button-color" onClick={openLogin}>
                                Login
                            </Button>
                            <Button variant='outline-warning' onClick={openSignUp}>
                                Sign Up
                            </Button>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default DesktopMenu