import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Analytics from "../pages/Dashboard/Analytics";
import Products from "./pages/Dashboard/Products";
import Stocks from "./pages/Dashboard/Stocks";
import Categories from "./pages/Dashboard/Categories";
import Users from "./pages/Dashboard/Users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Dashboard Route */}
     <Route path="/dashboard/analytics" element={<Analytics />} />
      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/dashboard/stocks" element={<Stocks />} />
      <Route path="/dashboard/categories" element={<Categories />} />
      <Route path="/dashboard/users" element={<Users />} />/>
    </Routes>
  );
}