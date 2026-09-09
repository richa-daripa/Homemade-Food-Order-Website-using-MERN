import { React, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../style.css'
import SignUp from './SignUp';
import Login from './Login';
import MobileMenu from './navbar/MobileMenu';
import DesktopMenu from './navbar/DesktopMenu';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {

    const { authModal, openLogin, openSignUp, closeModal } = useAuth();

    return (
        <Navbar bg="dark" data-bs-theme="dark" className='shadow-sm sticky-top'>
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt="EatZio" width="150" height="50" className="d-inline-block align-top" />
                </Navbar.Brand>

                <MobileMenu openLogin={openLogin} />
                <DesktopMenu openLogin={openLogin} openSignUp={openSignUp} />

            </Container>

            <Login show={authModal === 'login'} onHide={closeModal} forwardTo={openSignUp} />
            <SignUp show={authModal === 'signup'} onHide={closeModal} forwardTo={openLogin} />
        </Navbar>
    )
}

export default NavBar;