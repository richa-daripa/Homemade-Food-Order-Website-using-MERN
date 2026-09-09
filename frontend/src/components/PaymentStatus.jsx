import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const PaymentStatus = ({ icon, showSpinner = false, title, message, showButton = true, buttonText, handleClick }) => {

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                {showSpinner ? (
                    <Spinner animation="border" variant="primary" className="mb-4 spinner-large" />
                ) : (
                    icon
                )
                }
                <h2 className="mt-3">{title}</h2>
                <p className="fs-5 py-3">{message}</p>
                {showButton && (
                    <Button variant="warning" onClick={handleClick}>
                        {buttonText}
                    </Button>
                )
                }
            </div>
        </div>
    )
}

export default PaymentStatus