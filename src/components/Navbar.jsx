import React from 'react';

const Navbar = () => {
  return (
    <nav className="pt-1">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-900 font-bold text-3xl">PlanPro</div>
        <ul className="flex">
          <li className="mr-6">
            <a href="#" className="text-gray-900 hover:text-gray-700 font-semibold">Home</a>
          </li>
          <li>
            <a href="#" className="text-gray-900 hover:text-gray-700 font-semibold bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full">Your Tasks</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;