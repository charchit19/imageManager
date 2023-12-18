import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    // State to manage user roles and navigation
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Hooks for navigation and current pathname
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    // Check user authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        setIsAdmin(token === "admin@gmail.com");
    }, []);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Check if a navigation link is currently active
    const isLinkActive = (href) => {
        return pathname === href;
    };

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Brand logo and name */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Images
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation links */}
                    <div
                        className={`${isMobileMenuOpen ? "show" : "hidden"
                            } w-full md:w-auto md:flex md:items-center`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {isLoggedIn ? (
                                // Links for logged-in users
                                <>
                                    <li>
                                        {isAdmin ? (
                                            <Link
                                                to="/users"
                                                className={getNavLinkClass("/users")}
                                            >
                                                All Users
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/dashboard"
                                                className={getNavLinkClass("/dashboard")}
                                            >
                                                Home
                                            </Link>
                                        )}
                                    </li>

                                    <li>
                                        {isAdmin ? (
                                            <Link
                                                to="/allimg"
                                                className={getNavLinkClass("/allimg")}
                                            >
                                                All Images
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/images"
                                                className={getNavLinkClass("/images")}
                                            >
                                                My Images
                                            </Link>
                                        )}
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                // Links for non-logged-in users
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className={getNavLinkClass("/login")}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className={getNavLinkClass("/register")}
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );

    // Helper function to determine active navigation link class
    function getNavLinkClass(href) {
        return `block py-2 px-3 ${isLinkActive(href)
            ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            }`;
    }
};

export default Navbar;
