import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <ul className="flex justify-around">
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
            </ul>
        </nav>
    );
};

export default NavBar;

