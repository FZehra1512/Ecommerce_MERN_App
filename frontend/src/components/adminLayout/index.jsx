import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { TbCategoryFilled, TbLogout } from "react-icons/tb";
import { FaBarsStaggered, FaUsers, FaBox } from "react-icons/fa6";
import { BiHome, BiSearchAlt, BiSolidBell } from "react-icons/bi";
import { BsBarChartLineFill, BsCartCheckFill, BsPersonCircle } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const AdminNavbar = ({ toggleSidebar }) => {

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleSearchBar = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <div className="relative z-30">
      {/* Navbar */}
      <nav className="fixed bg-ashGray shadow-md w-full h-16 flex items-center justify-between px-4 md:px-6 xl:px-8 z-30">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="block lg:hidden text-gray-600 focus:outline-none"
          >
            <FaBarsStaggered size={24} />
          </button>
          <span className="text-lg font-semibold ml-4 md:ml-6 lg:ml-56">
            Dashboard
          </span>
        </div>

        <div className="flex items-center">
          {/* Search bar for larger screens */}
          <div className="hidden md:flex items-center w-56 xl:w-96 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 xl:mx-6">
            <BiSearchAlt className="text-gray-500 mr-2 text-2xl" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-outerSpace focus:outline-none"
            />
          </div>

          <div className="ml-4 flex items-end gap-4 md:gap-6 xl:gap-10">
            {/* Mobile search button */}
            <button
              onClick={toggleSearchBar}
              className="block md:hidden text-gray-600 focus:outline-none"
            >
              <BiSearchAlt className="text-[24px] md:text-2xl" />
            </button>

            {/* Other buttons */}
            <button
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none"
            >
              <BiSolidBell className="text-[24px] md:text-2xl" />
            </button>
            <button className="text-gray-600 focus:outline-none">
              <Link to="/shop">
                <BiHome className="text-[24px] md:text-2xl" />
              </Link>
            </button>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none mb-0 pb-0"
            >
              <Link to="/shop">
                <BsPersonCircle className="text-2xl" />
              </Link>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile search bar (beneath the navbar, sliding down from top) */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-100 p-4 transform transition-transform duration-300 ease-in-out ${
          showMobileSearch ? "translate-y-16" : "-translate-y-full"
        } md:hidden z-20`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-outerSpace text-sm border border-gray-400 rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
};


const Sidebar = ({ isOpen, setIsOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

   const closeSidebar = () => {
     setIsOpen(false);
   };
  
  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  const linkClass = "w-full cursor-pointer";
  const flexClass = "flex items-center p-4 rounded-lg transition-colors hover:bg-cherryBlossomPink";
  const iconClass = "w-5 text-lg inline-block mr-4";
  return (
    <div
      className={`bg-champagnePink text-outerSpace h-full w-3/4 sm:w-2/4 md:w-1/3 pb-4 px-2 lg:pb-6 fixed top-16 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:w-56 lg:transform-none lg:top-0 z-50`}
    >
      <div className="w-full flex items-center px-4 mt-4">
        <h2 className="text-3xl font-bold">InteriorX</h2>
      </div>
      <ul>
        <Link to="/adminDashboard" className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <BsBarChartLineFill className={iconClass} /> Dashboard
          </li>
        </Link>

        {/* Categories Dropdown */}
        <li
          className="w-full cursor-pointer p-4 rounded-lg transition-colors hover:bg-cherryBlossomPink"
          onClick={() => toggleDropdown(setCategoriesOpen)}
        >
          <div className="flex items-center">
            <TbCategoryFilled className={iconClass} /> Categories
            <IoIosArrowDown
              className={`text-xl pt-1 ml-auto transition-transform duration-300 ${
                categoriesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <ul
            className={`ml-9 text-sm flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
              categoriesOpen
                ? "mt-3 mb-1 max-h-40 opacity-100"
                : "my-0 max-h-0 opacity-0"
            }`}
          >
            <Link to="/adminDashboard/addCategory" onClick={closeSidebar}>
              Add Category
            </Link>
            <Link to="/adminDashboard/manageCategories" onClick={closeSidebar}>
              Manage Categories
            </Link>
          </ul>
        </li>

        {/* Products Dropdown */}
        <li
          className="w-full cursor-pointer p-4 rounded-lg transition-colors hover:bg-cherryBlossomPink"
          onClick={() => toggleDropdown(setProductsOpen)}
        >
          <div className="flex items-center">
            <FaBox className={iconClass} /> Products
            <IoIosArrowDown
              className={`text-xl pt-1 ml-auto transition-transform duration-300 ${
                productsOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <ul
            className={`ml-9 text-sm flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
              productsOpen
                ? "mt-3 mb-1 max-h-40 opacity-100"
                : "my-0 max-h-0 opacity-0"
            }`}
          >
            <Link to="/adminDashboard/addProduct" onClick={closeSidebar}>
              Add Product
            </Link>
            <Link to="/adminDashboard/manageProducts" onClick={closeSidebar}>
              Manage Products
            </Link>
          </ul>
        </li>

        <Link className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <FaUsers className={iconClass} /> Users
          </li>
        </Link>

        <Link className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <BsCartCheckFill className={iconClass} /> Orders
          </li>
        </Link>
        <Link className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <RiAdminFill className={iconClass} /> Admin Requests
          </li>
        </Link>
        <Link className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <TbLogout className={iconClass} /> Logout
          </li>
        </Link>
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
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
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
