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
import AdminLayout from "../components/adminLayout";


const MainRoutes = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Toast />
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/shop" element={<><Navbar /><Shop /></>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allProducts" element={<><Navbar /><ProductList /></>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/adminDashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="addProduct" element={<AddProd />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
