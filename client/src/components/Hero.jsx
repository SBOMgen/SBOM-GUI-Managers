import React from "react";
import { Link } from "react-router-dom";
import githubLogo from "/github-purple.png";
import { useSelector } from 'react-redux';

const Hero = ({ auth }) => {
    let path = "login"
    if (auth) {
        path = "repos"
    }
    return (
        <div className="relative" id="home">
            <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-4 -space-x-52 opacity-40 "
            >
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-gray-600 to-gray-300 "></div>
            </div>
            <div className="relative pt-36 ml-auto">
                <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-900  font-bold text-5xl md:text-6xl xl:text-7xl">
                        Supply chain risk management with{" "}
                        <span className="text-primary ">SBOMgen</span>
                    </h1>
                    <p className="mt-8 text-gray-700 ">
                        This resource serves as the detailed foundation of SBOM. It defines SBOM concepts and related terms, offers an updated baseline of how software components are to be represented, and discusses the processes around SBOM creation.
                    </p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                        <Link
                            to="/"
                            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                        >
                            <span className="relative text-base font-semibold text-white">
                                Get started
                            </span>
                        </Link>
                        <Link
                            to={path}
                            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                        >
                            <span className="relative text-base font-semibold text-primary flex items-center gap-2">
                                {!auth ? (<p>Login with Github </p>) : (<p>View Repositories</p>)}
                                <img
                                    src={githubLogo}
                                    alt="GitHub Logo"
                                    className="h-6 w-6 object-contain"
                                ></img>
                            </span>


                        </Link>
                    </div>
                    <div id="about" className="py-8 mt-16 border-y border-gray-100 sm:flex justify-between">
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 ">
                                Free and Open Source
                            </h6>
                            <p className="mt-2 text-gray-500">meow meow</p>
                        </div>
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 ">
                                automated vulerability detection
                            </h6>
                            <p className="mt-2 text-gray-500">meow meow</p>
                        </div>
                        <div className="text-left">
                            <h6 className="text-lg font-semibold text-gray-700 ">given </h6>
                            <p className="mt-2 text-gray-500">meow meow</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
