import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Shop from "../pages/shop";
import ProductList from "../pages/allProducts";
import Signup from "../pages/Auth/signup";
import Login from "../pages/Auth/Login";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allProducts" element={<ProductList></ProductList>} />
        <Route path="/adminDashboard" element={<h1>Admin dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
