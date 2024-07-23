import React from 'react';
import { useSelector } from 'react-redux';
// import './Profile.css'; 
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {

    const auth = useSelector(state => state.isAuthenticated);

    // if (user) {
    //     return <Navigate to="/"/>;
    // }
    console.log(auth);

    return (
        <div>
            <Hero auth={auth}/>
            <Footer/>
        </div>
    );
};

export default Home;
