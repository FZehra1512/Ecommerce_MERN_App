import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Shop from "../pages/shop";
import ProductList from "../pages/allProducts";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/allProducts" element={<ProductList></ProductList>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
