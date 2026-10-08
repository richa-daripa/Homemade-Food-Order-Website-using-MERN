import React from 'react'
import Header from '../components/Header';
import ExploreMenu from '../components/ExploreMenu';
import Services from '../components/Services';
import AppDownLoad from '../components/AppDownload';
import { Toast } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { CircleCheck, TriangleAlert } from 'lucide-react';

const Home = () => {
    const { logoutMsg, setLogoutMsg, logoutType } = useAuth();

    return (
        <>

            <Toast show={!!logoutMsg} delay={3000} autohide
                className='z-3 w-100'
                onClose={() => setLogoutMsg("")}
            >
                <Toast.Body
                    className={`d-flex align-items-center gap-2 px-3 text-white ${logoutType === "success"
                        ? "bg-success"
                        : "bg-danger-subtle text-danger"
                        }`}
                >
                    {logoutType === "success" ? (
                        <CircleCheck size={18} />
                    ) : (
                        <TriangleAlert size={18} />
                    )}
                    {logoutMsg}
                </Toast.Body>
            </Toast>

            <Header />
            <ExploreMenu />
            <Services />
            <AppDownLoad />
        </>
    )
}
export default Home;