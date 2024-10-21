import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                <li>
                    <Link to="/habit-management" className="text-white hover:text-gray-200">
                        Habit Management
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="text-white hover:text-gray-200">
                        Login
                    </Link>
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
            
            </ul>
         </div>
        </nav>
    );
};

export default NavBar;

