import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ORDER_API_URL } from "../utils/constants";
import { CircleCheck, CircleX, OctagonAlert } from 'lucide-react';
import '../style.css'
import PaymentStatus from "../components/PaymentStatus";
import { getAuthConfig } from "../utils/authAxios";
import { useAuth } from "../hooks/useAuth";

const PaymentVerification = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user ,authLoading} = useAuth();

    const [status, setStatus] = useState("checking");

    //access the query string (session_id) using React Router’s useLocation or useSearchParams from success_url
    const sessionId = searchParams.get("session_id");

    const attempts = useRef(0);
    const maxAttempts = 10;

    const checkPaymentStatus = async () => {
        try {
            const config = await getAuthConfig(user);

            const response = await axios.get(`${ORDER_API_URL}/payment-status/${sessionId}`,
                config
            );
            const data = response.data;

            if (data.paymentStatus === "unpaid") {
                setStatus("failed");
                return;
            }

            if (data.paymentStatus === "paid" && data.orderStatus === "created") {
                setStatus("success");

                setTimeout(() => {
                    navigate(`/order/${data.orderId}`);
                }, 2000);

                return;
            }

            if (data.paymentStatus === "paid" && data.orderStatus === "processing") {

                attempts.current++;

                if (attempts.current >= maxAttempts) {
                    setStatus("timeout");
                    return;
                }
                setStatus("processing");

                setTimeout(checkPaymentStatus, 1500);// Wait 1.5 seconds, then call checkPaymentStatus() again.
                return;
            }
            setStatus("error");

        } catch (error) {
            console.error("Payment verification failed:", error);
            setStatus("error");
        }
    };

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            return;
        }
        if (authLoading) {
            return;
        }

        checkPaymentStatus();
    }, [sessionId, authLoading]);


    if (!sessionId || status === "error") {
        return (
            <PaymentStatus
                icon={<CircleX color="red" size={54} className="mb-4" />}
                title="Unable to verify payment"
                message="We couldn't verify your payment."
                buttonText="Back to Cart"
                handleClick={() => navigate("/cart")}
            />
        );
    }

    if (status === "failed") {
        return (
            <PaymentStatus
                icon={<OctagonAlert color="red" size={54} className="mb-4" />}
                title="Payment Failed"
                message="Your payment was not completed."
                buttonText="Back to Cart"
                handleClick={() => navigate("/cart")}
            />
        );
    }

    if (status === "checking" || status === "processing") {
        return (
            <PaymentStatus
                showSpinner={true}
                title="Payment Received"
                message="Confirming your order..."
                showButton={false}
            />
        );
    }

    if (status === "timeout") { //timeout means frontend stopped waiting
        return (
            <PaymentStatus
                showSpinner={true}
                title="Payment Received"
                message="We're still confirming your order..."
                buttonText="Go to My Orders"
                handleClick={() => navigate("/myOrders")}
            />
        );
    }

    if (status === "success") {
        return (
            <PaymentStatus
                icon={<CircleCheck color="green" size={84} className="mb-4" />}
                title="Payment Successful"
                message="Redirecting to your orders..."
                showButton={false}
            />
        );
    }
    return null;
};

export default PaymentVerification;