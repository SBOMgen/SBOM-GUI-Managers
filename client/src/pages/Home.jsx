import React from 'react';
import { useSelector } from 'react-redux';
import Hero from '../components/Hero'
const Home = () => {

    const auth = useSelector(state => state.isAuthenticated);
    console.log(auth);
    let path = "login"
    if (auth) {
        path = "repos"
    }

    return (
        <div className="mx-10 custom-md:mx-0">
            <Hero auth={auth}/>
        </div>
    );
};

export default Home;
