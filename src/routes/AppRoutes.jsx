import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import AdminLayout from "../layouts/AdminLayout";

import Analytics from "../pages/Dashboard/Analytics";
import Products from "../pages/Dashboard/Products";
import Stock from "../pages/Dashboard/Stocks";
import Categories from "../pages/Dashboard/Categories";
import Users from "../pages/Dashboard/Users";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="stock" element={<Stock />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}