import { Navbar, Container } from "react-bootstrap";
import { CircleUserRound } from "lucide-react";
import logo from '../assets/logo.png'

const AdminNavbar = () => {
    return (
        <Navbar bg="dark" className="shadow-sm border-bottom px-4 text-white">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand>
                    <img alt="Eatzio" src={logo} width="120" height="40" className="d-inline-block align-top"/>
                </Navbar.Brand>

                <div className="d-flex align-items-center gap-2">
                    <CircleUserRound size={32} />
                    <span>Admin</span>
                </div>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;