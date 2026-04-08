import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SubAgentLayout from "./layouts/SubAgentLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Admin Pages //
import Login from "./pages/Auth/Login";
import Analytics from "./pages/Dashboard/Analytics";
import Products from "./pages/Dashboard/Products";
import Stock from "./pages/Dashboard/Stocks";
import Categories from "./pages/Dashboard/Categories";
import Users from "./pages/Dashboard/Users";

// SubAgent Pages //
import SubDashboard from "./pages/SubAgent/Dashboard";
import Upload from "./pages/SubAgent/Upload";
import ViewProducts from "./pages/SubAgent/ViewProducts";
import Wallet from "./pages/SubAgent/Wallet";
import Profile from "./pages/SubAgent/Profile";

function App() {
  const role = localStorage.getItem("role"); // admin / subagent

  return (
    <Router>
      <Routes>
                 {/* LOGIN Page*/}
          <Route path ="/login" element={<Login />} />
         
        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="stocks" element={<Stock />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="upload" element={<Upload />} />
        </Route>

        {/* ================= SUB AGENT ROUTES ================= */}
        <Route path="/subagent" element={<SubAgentLayout />}>
          <Route index element={<SubDashboard />} />    // default
          <Route path="upload" element={<Upload />} />
          <Route path="products" element={<ViewProducts />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ================= DEFAULT REDIRECT ================= */}
        <Route
          path="/"
          element={
            role === "admin"
                ? <Navigate to="/dashboard" />
              : role === "subagent"
              ? <Navigate to="/subagent" />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;