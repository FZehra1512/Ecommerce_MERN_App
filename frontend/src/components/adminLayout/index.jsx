import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaEnvelope,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed border border-red-900 bg-white shadow-md h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        <span className="text-lg font-semibold ml-4">Greetings Clyde!</span>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="hidden lg:block px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="ml-4 flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2">Clyde Miles</span>
        </div>
      </div>
    </nav>
  );
};


const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`border border-red-900 bg-purple-800 text-white h-full fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-3/4"
      } transition-transform duration-300 ease-in-out lg:static lg:w-64 z-50`}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold">Material Dash</h2>
        <p className="text-sm">clydemiles@elenor.us</p>
      </div>
      <ul className="mt-4">
        <li className="p-4 hover:bg-purple-700">
          <FaTachometerAlt className="inline-block mr-2" /> Dashboard
        </li>
        <li className="p-4 hover:bg-purple-700">
          <Link to="/adminDashboard/addProduct">
            <FaBox className="inline-block mr-2" /> Products
          </Link>
        </li>
        <li className="p-4 hover:bg-purple-700">
          <FaEnvelope className="inline-block mr-2" /> Email
        </li>
        <li className="p-4 hover:bg-purple-700">
          <FaChartBar className="inline-block mr-2" /> Analytics
        </li>
        <li className="p-4 hover:bg-purple-700">
          <FaCogs className="inline-block mr-2" /> Settings
        </li>
      </ul>
    </div>
  );
};


const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
