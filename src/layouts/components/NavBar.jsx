import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="flex space-x-4">
          <Link
            className="text-white hover:text-gray-300"
            to="/demo/default-page"
          >
            Omega Page
          </Link>
          <Link className="text-white hover:text-gray-300" to="/demo/day-one">
            Day One
          </Link>
          <Link className="text-white hover:text-gray-300" to="/demo/color">
            Color
          </Link>
          <Link className="text-white hover:text-gray-300" to="/demo/icon">
            Icon
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
