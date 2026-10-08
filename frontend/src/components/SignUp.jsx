import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Container } from 'react-bootstrap';
import { isPwdValid, FULL_NAME_REGEX, nameValidation } from '../utils/validators';
import { CircleX } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import '../style.css'

const SignUp = ({ show, onHide, forwardTo }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
        clearErrors
    } = useForm({ mode: "onChange" });

    const { handleSignUp, signUpError } = useAuth();

    // subscribe to those fields and re-render the UI immediately on every keystroke
    const watchFields = watch(["uname", "email", "passwd"]);

    useEffect(() => {
        if (show) {
            reset();
        }
    }, [show, reset]);

    const handleClose = () => {
        onHide();
        reset();
        clearErrors();
    };

    const onSubmit = async ({ uname, email, passwd }) => {
        const success = await handleSignUp(uname, email, passwd);
        if (success) {
            handleClose();
        }
    };

    const handleSwitchToLogin = () => {
        handleClose();
        forwardTo();
    };


    return (
        <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container className='my-3'>
                <Modal.Header className='border-bottom-0' closeButton>
                    <Modal.Title className='fs-2'>Join us <br /> Create a Eatzio account</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {
                        signUpError && (
                            <span className='d-block text-center text-danger mb-4'>
                                <CircleX size={18} className='me-3 text-danger' />{signUpError}
                            </span>
                        )
                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control border-2" placeholder=" "
                                {...register('uname', {
                                    required: "Full name is required",
                                    pattern: {
                                        value: FULL_NAME_REGEX,
                                        message: nameValidation,
                                    },
                                })}
                            />
                            <label>Full Name</label>
                            {errors.uname && (
                                <span className="error-msg">{errors.uname.message}</span>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control border-2" placeholder=" "
                                {...register('email', {
                                    required: "Email is required",
                                })}
                            />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control border-2" placeholder=" "
                                {...register('passwd', {
                                    required: "Password is required",
                                    validate: isPwdValid,
                                })}
                            />
                            <label>Your password</label>
                            {errors.passwd && (
                                <span className="error-msg">{errors.passwd.message}</span>
                            )}
                        </div>

                        <Button className='w-100 custom-button-color mt-2' type='submit' disabled={isSubmitting}>
                            {isSubmitting ? "Creating your account..." : "Sign Up"}
                        </Button>
                        {!isSubmitting && (
                            <>
                                <small className="text-primary ms-2">By SignUp, you agree to the terms of use.</small>
                                <p className="mt-4 mb-0 text-center">Already have an account?
                                    <span className='custom-text-color custom-pointer' onClick={handleSwitchToLogin}>
                                        Log In
                                    </span></p>
                            </>
                        )}
                    </form>
                </Modal.Body>
            </Container>
        </Modal>
    );
};
export default SignUp;