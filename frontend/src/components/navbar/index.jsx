import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { customLocalStorage } from '../../features/customLocalStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = customLocalStorage.getItem("userName");

  const handleLogout = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/logout");
        console.log(response.data)
        if (response.status === 200) {
            toast.success("Logout Successful");
            localStorage.removeItem("userType");
            localStorage.removeItem("userName");
            navigate("/shop");
        }
      } catch (error) {
        console.log(response);
        toast.error("Error in logout");
      }
      
    };

  return (
    <div className='fixed z-10 w-full bg-champagnePink flex'>
        {userName&&<button onClick={handleLogout} className="bg-ashGray p-2 text-base m-4">Logout</button>}
        {!userName&&<Link to={`/login`} className="bg-ashGray p-2 text-base m-4">Login</Link>}
        {userName ? <h1>Hi {userName}</h1> : <></>}
    </div>
  )
}

export default Navbar
