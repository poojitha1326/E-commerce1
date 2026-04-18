import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  HiChartBar,
  HiShoppingBag,
  HiUsers,
  HiTag,
  HiArchive,
  HiMenu,
  HiX,
  HiLogout
} from "react-icons/hi";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-white flex justify-between items-center p-4 z-50">
        <h2 className="font-bold">Admin</h2>
        <HiMenu size={24} onClick={() => setOpen(true)} />
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-64 max-w-[80%] bg-black text-white h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Dashboard</h2>
              <HiX size={24} onClick={() => setOpen(false)} />
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              <NavLink to="/dashboard" end className={navClass} onClick={() => setOpen(false)}>
                <HiChartBar /> Analytics
              </NavLink>

              <NavLink to="/dashboard/products" className={navClass} onClick={() => setOpen(false)}>
                <HiShoppingBag /> Products
              </NavLink>

              <NavLink to="/dashboard/stocks" className={navClass} onClick={() => setOpen(false)}>
                <HiArchive /> Stock
              </NavLink>

              <NavLink to="/dashboard/categories" className={navClass} onClick={() => setOpen(false)}>
                <HiTag /> Categories
              </NavLink>

              <NavLink to="/dashboard/users" className={navClass} onClick={() => setOpen(false)}>
                <HiUsers /> Users
              </NavLink>

              {/* ✅ FIXED LOGOUT */}
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg transition text-gray-300 hover:bg-gray-800 w-full text-left"
              >
                <HiLogout />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex md:flex-col w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={navClass}>
            <HiChartBar /> Analytics
          </NavLink>

          <NavLink to="/dashboard/products" className={navClass}>
            <HiShoppingBag /> Products
          </NavLink>

          <NavLink to="/dashboard/stocks" className={navClass}>
            <HiArchive /> Stock
          </NavLink>

          <NavLink to="/dashboard/categories" className={navClass}>
            <HiTag /> Categories
          </NavLink>

          <NavLink to="/dashboard/users" className={navClass}>
            <HiUsers /> Users
          </NavLink>

          {/* ✅ FIXED LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg transition text-gray-300 hover:bg-gray-800 w-full text-left"
          >
            <HiLogout />
            Logout
          </button>
        </nav>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-4 md:p-6 mt-16 md:mt-0 overflow-x-hidden">
         <div className="max-w-6xl mx-auto"></div>
        <Outlet />
      </div>

    </div>
  );
}