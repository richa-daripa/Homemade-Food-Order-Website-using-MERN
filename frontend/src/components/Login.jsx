import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Container } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
import { CircleX } from "lucide-react";
import { useAuth } from '../hooks/useAuth';

const Login = ({ show, onHide, forwardTo }) => {

    const { login, signInWithGoogle } = useAuth();
    const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm({ mode: 'onChange' });
    const [error, setError] = useState("");
    const [googleLoading, setGoogleLoading] = useState(false);

    useEffect(() => {
        if (show) {
            reset();
        }
    }, [show, reset]);

    const handleClose = () => {
        onHide();
        reset();
        setError("");
    };

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError("");
        }, 4000);

        return () => clearTimeout(timer);
    }, [error]);

    const onSubmit = async ({ email, passwd }) => {
        try {
            setError("");

            await login(email, passwd);
            handleClose();
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid credentials or account not found.");
            } else {
                setError("Something went wrong");
            }
        }
    }

    const handleGoogleLogin = async () => {
        try {
            handleClose();
            setGoogleLoading(true);

            await signInWithGoogle();

        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') {
                return;
            }
            console.error("Google sign-in failed:", err);
            setError("Google sign-in failed. Please try again.");
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleSwitchToSignup = () => {
        handleClose();
        forwardTo();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Container className='my-3'>
                    <Modal.Header className='border-bottom-0' closeButton>
                        <Modal.Title className='fs-2'>Welcome back! <br />Login to your account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {
                            error && (
                                <span className='d-block text-center text-danger mb-4'>
                                    <CircleX size={18} className="me-2 text-danger" />{error}
                                </span>
                            )
                        }
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating mb-3">
                                <input type="email" required
                                    className="form-control border-2" placeholder='Email'
                                    {...register('email')}
                                />
                                <label >Your email</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password" required
                                    className="form-control border-2" placeholder='Password'
                                    {...register('passwd')}
                                />
                                <label >Your password</label>
                            </div>

                            <Button className='w-100 custom-button-color mt-3' type='submit' disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Log In"}
                            </Button>

                            <div className="d-flex align-items-center my-4">
                                <hr className="flex-grow-1 border-secondary" />
                                <p className="fs-6 text-center text-secondary text-opacity-75 mx-5 mb-0">OR</p>
                                <hr className="flex-grow-1 border-secondary" />
                            </div>

                            <Button variant="outline-dark w-100" className='mb-3 rounded-3 d-flex align-items-center justify-content-center' onClick={handleGoogleLogin}>
                                <FcGoogle size={22} className='me-2' />Continue with Google
                            </Button>

                            <p className="mt-4 mb-0 text-center">New to Eatzio? <span className='custom-text-color custom-pointer' onClick={handleSwitchToSignup}>Sign Up</span></p>
                        </form>
                    </Modal.Body>
                </Container>
            </Modal>
        </>
    );
};
export default Login;