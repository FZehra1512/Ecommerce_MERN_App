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
import AddProd from "../pages/adminDashboard/product/AddProd";
import ProductPage from "../pages/productPage"
import Profile from "../pages/profile"
import Cart from "../pages/cart"
import AdminLayout from "../components/adminLayout";
import ManageCategory from "../pages/adminDashboard/category/manageCategory";
import ManageProduct from "../pages/adminDashboard/product/manageProd";
import AddCategory from "../pages/adminDashboard/category/addCategory";


const MainRoutes = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Toast />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/allProducts"
          element={
            <>
              <Navbar />
              <ProductList />
            </>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/adminDashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="manageCategories" element={<ManageCategory />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="manageProducts" element={<ManageProduct />} />
            <Route path="addProduct" element={<AddProd />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
