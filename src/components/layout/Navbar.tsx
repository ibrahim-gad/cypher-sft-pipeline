import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {FaMoon, FaSun} from "react-icons/fa";

const Navbar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkTheme);
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
            <div className="flex space-x-4">
                <Link to="/" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
                <Link to="/settings" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">Settings</Link>
            </div>
            <button
                onClick={toggleTheme}
                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
                {isDarkTheme ? <FaSun/> : <FaMoon/>}
            </button>
        </nav>
    );
};

export default Navbar;