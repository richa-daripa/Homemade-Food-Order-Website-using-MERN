import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const NotFound = () => {
    return (
        <Container className='text-center mt-4 pt-4'>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you’re looking for doesn’t exist or has been moved.</p>
        </Container>
    )
}

export default NotFound