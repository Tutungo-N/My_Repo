import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/store'; 

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Access Redux state
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    //Logout handler
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user'); // Clear user data from local storage
        window.location.href = '/'; // Redirect to home page
    };

    // Check if the user is already logged in using localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            // Optionally dispatch an action to update Redux state if you want 
        }
    }, []);

    return (
        <nav className="bg-blue-500 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
            <div className="container mx-auto p-4 flex justify-between items-center">
                {/* Brand Logo or Name */}
                <Link to="/" className="text-white text-xl left-0 font-bold">
                    TrackiBits
                </Link>

                {/* Hamburger Icon for Mobile */}
                <button
                    className="text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                        />
                    </svg>
                </button>

                {/* Nav Links for Desktop & Mobile */}
                <ul className={`md:flex space-x-6 items-center ${isOpen ? 'block' : 'hidden'} md:block ml-auto`}>
                    <li>
                        <Link to="/" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                    </li>

                    {/* Habit Management link with Tooltip */}
                    <li className="relative group"> {/* Add group class here */}
                        <Link to="/habit-management" className="text-white hover:text-gray-200">
                            Habit Management
                        </Link>
                        {/* Tooltip */}
                        <span className="absolute left-0 top-full mt-2 hidden group-hover:inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                            Click here to create your habits
                        </span>
                    </li>

                    <li>
                        <Link to="/about" className="text-white hover:text-gray-200">
                            About Me
                        </Link>
                    </li>
                    <li>
                        <Link to="/resources" className="text-white hover:text-gray-200">
                            Resources
                        </Link>
                    </li>

                    {/* Conditional rendering based on login status */}
                    {isLoggedIn ? (
                        <>
                            <li>
                                {/* Display user's name if logged in */}
                                <span className="text-white">
                                    Welcome, {user ?.firstName}!
                                </span>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-green hover:text-gray-200"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-white hover:text-gray-200">
                                    Login
                                </Link>
                            </li>
                   
                            <li>
                                <Link to="/signup" className="text-white hover:text-gray-200">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                 </ul>
            </div>
        </nav>
    );
};

export default NavBar;
