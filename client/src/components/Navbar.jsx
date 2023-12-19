import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";

const Navbar = () => {
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
        <div className="navbar">
            <span className="logo">
                <Link className="link" to="/">
                    Lama App
                </Link>
            </span>
            {user ? (
                <ul className="list">
                    <li className="listItem">
                        <img
                            src={user.photos[0].value}
                            alt=""
                            className="avatar"
                        />
                    </li>
                    <li className="listItem">{user.displayName}</li>
                    <li className="listItem" onClick={logout}>
                        Logout
                    </li>
                </ul>
            ) : (
                <Link className="link" to="login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Navbar;
