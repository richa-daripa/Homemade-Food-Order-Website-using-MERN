import React from 'react'
import Header from '../components/Header';
import ExploreMenu from '../components/ExploreMenu';
import Services from '../components/Services';
import AppDownLoad from '../components/AppDownload';


const Home = () => {
    return (
        <>
            <Header/>
            <ExploreMenu />
            <Services />
            <AppDownLoad />
        </>
    )
}
export default Home;