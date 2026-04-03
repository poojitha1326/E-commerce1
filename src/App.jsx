import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import SubAgentLayout from "./layouts/SubAgentLayout";

// ✅ Admin Pages (UNCHANGED)
import Analytics from "./pages/Dashboard/Analytics";
import Products from "./pages/Dashboard/Products";
import Stock from "./pages/Dashboard/Stocks";
import Categories from "./pages/Dashboard/Categories";
import Users from "./pages/Dashboard/Users";

// ✅ SubAgent Pages
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

        {/* ================= ADMIN ROUTES (NO CHANGE) ================= */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="stocks" element={<Stock />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* ================= SUB AGENT ROUTES ================= */}
        <Route path="/subagent" element={<SubAgentLayout />}>
          <Route index element={<SubDashboard />} />
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
              : <Navigate to="/subagent" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;