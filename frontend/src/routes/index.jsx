import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";
import Home from "../pages/home";
import Shop from "../pages/shop";
import ProductList from "../pages/allProducts";
import Signup from "../pages/Auth/signup";
import Login from "../pages/Auth/Login";
import AdminDashBoard from "../pages/adminDashboard";
import Navbar from "../components/navbar";
import Toast from "../components/toast";
import AddProd from "../pages/adminDashboard/AddProd";
import ProductPage from "../pages/productPage"


const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allProducts" element={<ProductList></ProductList>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/adminDashboard" element={<AdminDashBoard />} />
          <Route path="/addProduct" element={<AddProd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
