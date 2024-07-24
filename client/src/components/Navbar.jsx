import { Link, Navigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthentication, setTrue, setFalse } from "../function/authSlice";
import Repos from "../pages/Repos";

const Navbar = () => {
    //-------------------------------
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/login/success", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                });

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
        <nav className="bg-white border-gray-200 mt-1">
            <div className="px-10 custom-md:px-36 flex flex-wrap items-center justify-between mx-auto p-3">
                <div className="flex flex-1 sm:flex-none justify-center sm:justify-start">
                    <span className="logo font-bold">
                        <Link className="" to="/">
                            SBOMGEN
                        </Link>
                    </span>
                </div>
                <div
                    className="sm:flex sm:flex-1 sm:justify-center hidden w-full sm:w-auto "
                    id="navbar-search"
                >
                    <ul className="sm:flex sm:align-middle absolute -translate-x-1/2 -translate-y-1/2 left-1/2 justify-center p-4 sm:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-white">
                        <li>
                            <Link
                                to="/"
                                className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-primary sm:p-0 "
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <HashLink
                                to="/#about"
                                className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-primary sm:p-0 "
                                >
                                About
                            </HashLink>
                        </li>
                        <li>
                            <a
                                href="https://github.com/SBOMgen"
                                target="_blank"
                                className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-primary sm:p-0 "
                            >
                                Contribute
                            </a>
                        </li>
                    </ul>
                </div>
                {user ? (
                    <div className="hidden custom-md:flex custom-md:items-center gap-5">
                        <ul className="list flex gap-5 items-center">
                            <a className="list flex gap-5 items-center" target="_blank" href={user.profileUrl}>
                                <li className="listItem">
                                    <img
                                        src={user.photos[0].value}
                                        alt=""
                                        className="h-10 w-10 rounded-full"
                                    />
                                </li>
                                <li className="p- inline font-bold">{user.displayName}</li>
                            </a>
                            <li className="listItem">
                                <button
                                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                    onClick={logout}
                                >
                                    <span className="relative text-base font-semibold text-white">
                                        Logout
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="hidden custom-md:flex">
                        <Link className="link" to="login">
                            <button
                                type="button"
                                className="relative  flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95  sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-primary ">
                                    Signin with Github
                                </span>
                            </button>
                        </Link>
                    </div>
                )}

                <div className="custom-md:hidden flex flex-wrap justify-between items-center mr-0.5">
                    <button
                        className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="6" x2="20" y2="6" />
                                <line x1="5" y1="12" x2="15" y2="12" />
                                <line x1="5" y1="18" x2="20" y2="18" />
                            </svg>
                        )}
                    </button>
                    {/* -------------hamburger---------- */}
                    <div
                        className={`${isMenuOpen ? "flex" : "hidden"} z-10 flex-col items-center w-full custom-md:hidden transition-all duration-300 ease-in-out overflow-hidden`}
                        id="navbar-search"
                    >
                        <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 space-y-4">
                            <li className="sm:hidden">
                                <Link to="/" className="block py-2 text-gray-900 hover:bg-gray-100">
                                    Home
                                </Link>
                            </li>
                            <li className="sm:hidden">
                                <HashLink to="/#about" className="block py-2 text-gray-900 hover:bg-gray-100">
                                    About
                                </HashLink>
                            </li>
                            <li className="sm:hidden">
                                <HashLink to="/#contribute" className="block py-2 text-gray-900 hover:bg-gray-100">
                                    Contribute
                                </HashLink>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <img
                                            src={user.photos[0].value}
                                            alt="Profile"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </li>
                                    <li>
                                        <button
                                            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                            onClick={logout}
                                        >
                                            <span className="relative text-base font-semibold text-white">
                                                Logout
                                            </span>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link className="link" to="login">
                                        <button
                                            type="button"
                                            className="relative  flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95  sm:w-max"
                                        >
                                            <span className="relative text-base font-semibold text-primary ">
                                                Signin with Github
                                            </span>
                                        </button>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
