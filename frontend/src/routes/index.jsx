import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import ProductList from "../pages/allProducts";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
