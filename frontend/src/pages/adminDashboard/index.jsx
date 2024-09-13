import React, { useState, useEffect } from 'react';
import { customLocalStorage } from '../../features/customLocalStorage';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png"
import { IoAdd } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";




const AdminDashBoard = () => {
  console.log(`In dashboard ${customLocalStorage.getItem("userType")}`);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <div className=" relative top-16 main-div border border-zinc-950 w-3/12 h-screen">
    //   <div className=" flex flex-col justify-center items-center logo overflow-hidden">
    //     <img src={logo} alt="logo" />
    //     {/* <h2 className=' w-full text-center'>InteriorX</h2> */}
    //   </div>
    //   <div className="text-slate-950 flex flex-col justify-center items-stretch gap-2 list">
    //     <Link to="/addProduct" className="hover:bg-pink-200 flex justify-evenly items-center">
    //       <Link to="/addProduct" className='text-1xl'>Add Product</Link>
    //       <IoAdd />
    //     </Link>

    //     <div className="flex justify-evenly items-center">
    //       <Link className='text-1xl'>View Orders</Link>
    //       <FaCartShopping />
    //     </div>



    //   </div>
    // </div>
    <div className='h-screen flex justify-center items-center'>This is the admin dashboard</div>
  );
}

export default AdminDashBoard;



