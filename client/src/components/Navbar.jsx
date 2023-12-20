import { Link, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";
import Repos from "../pages/Repos"

const Navbar = () => {
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/auth/login/success",
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                        },
                    }
                );

                if (response.status === 200) {
                    const resObject = await response.json();
                    dispatch(setTrue());
                    setUser(resObject.user);
                    console.log(resObject.user);
                } else {
                    dispatch(setFalse());
                    throw new Error("Authentication has failed!");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getUser();
    }, [dispatch]);

    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    return (
        <>
        <div className="navbar flex justify-between p-6  text-white bg-zinc-800 m-0">
            <div className="mt-2 flex gap-1">
                <img src="https://icons8.com/icon/2963/globe" alt=""/>
                <span className="logo font-bold">
                   
                    <Link className="link" to="/">
                        SBOMGEN
                    </Link>
                </span>
            </div>

            {user ? (
               
                <>
               
                <div className="">
                <ul className="list flex gap-5 items-center">
                    <li className="listItem">
                        <img
                            src={user.photos[0].value}
                            alt=""
                            height="30px"
                            width="30px"
                            className="avatar rounded-full mt-2"
                        />
                    </li>
                    <li className="listItem inline font-bold mt-2">{user.displayName}</li>
                    <li className="listItem" onClick={logout}>

                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Logout
                    </button>
                    </li>
                    
                </ul>
                
                </div>
               {/*  <Navigate to="/repos"/> */}
                </>
            ) : (
                <Link className="link" to="login">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Login
                    </button>
                    {/* <Navigate to="/"/> */}
                </Link>
            )}
         </div>
         
         </>
        
         
         
    );
};

export default Navbar;