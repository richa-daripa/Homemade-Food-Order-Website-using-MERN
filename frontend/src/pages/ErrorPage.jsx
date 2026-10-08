import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Frown } from "lucide-react";
import '../style.css';

const ErrorPage = () => {

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center container-width">
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <Frown size={70} strokeWidth={1.5} />
                    <h1 className="display-4">ops!</h1>
                </div>
                <h2 className="mt-4 mb-3">
                    Something went wrong
                </h2>
                <p className="text-muted mb-4  mx-auto px-2">
                    We're sorry but something unexpected happened. Please come back later.
                </p>
                <Button variant="warning" as={Link} to="/" className="px-4 py-2 mt-3">
                    Go to Main Page
                </Button>
            </div>
        </Container>
    )
}

export default ErrorPage




