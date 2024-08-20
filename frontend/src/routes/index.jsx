import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import ProductList from "../pages/allProducts";
import Signup from "../pages/Auth/signup";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproducts" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
