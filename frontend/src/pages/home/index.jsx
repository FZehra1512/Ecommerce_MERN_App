import React from 'react'
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <h1>This is home page</h1>
        <NavLink to="/shop">Shop</NavLink>
    </div>
  )
}

export default Home
