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
            {/* <div className="whole">
                <div className="style-0">
                    <div className="style-1">
                        <div className="style-2">
                            <h1 className="style-3">SBOM</h1>
                            <p className="style-4">This resource serves as the detailed foundation of SBOM. It defines SBOM concepts and related terms, offers an updated baseline of how software components are to be represented, and discusses the processes around SBOM creation.</p>

                            {(!auth) ? <div className="style-5 rounded-full">
                            <Link className="link" to="login"> <button style={{ color: '#fff' }} className="style-7 rounded-full">Sign in with Github</button> </Link>
                            </div> : <Link to="/repos"><div><button style={{ color: '#fff' }} className="style-7 rounded-full">Repos</button></div></Link>
                            }

                        </div>
                    </div>
                    <div>
                        <img src="https://media.tenor.com/NOYF3f82b_gAAAAM/programmer.gif" className='gif h-24 w-24' alt="Programmer GIF - Programmer GIFs" loading="fast">
                        </img>
                    </div>
                </div>
            </div> */}
            <Footer/>
        </div>
    );
};

export default Home;
