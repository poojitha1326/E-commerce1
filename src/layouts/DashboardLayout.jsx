import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  HiChartBar, HiShoppingBag, HiUsers, HiTag, HiArchive,
  HiMenu, HiX
} from "react-icons/hi";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-white flex justify-between p-4 z-50">
        <h2>Admin</h2>
        <HiMenu onClick={() => setOpen(true)} />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="w-64 bg-black text-white h-full p-4">
            <div className="flex justify-between mb-4">
              <h2>Dashboard</h2>
              <HiX onClick={() => setOpen(false)} />
            </div>

            <NavLink to="/dashboard" end className={navClass}> <HiChartBar /> Analytics</NavLink>
            <NavLink to="/dashboard/products" className={navClass}> <HiShoppingBag /> Products</NavLink>
            <NavLink to="/dashboard/stocks" className={navClass}> <HiArchive /> Stock</NavLink>
            <NavLink to="/dashboard/categories" className={navClass}> <HiTag /> Categories</NavLink>
            <NavLink to="/dashboard/users" className={navClass}> <HiUsers /> Users</NavLink>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-black text-white p-4">
        <h2 className="text-xl mb-6">Admin Dashboard</h2>

        <NavLink to="/dashboard" end className={navClass}> <HiChartBar /> Analytics</NavLink>
        <NavLink to="/dashboard/products" className={navClass}> <HiShoppingBag /> Products</NavLink>
        <NavLink to="/dashboard/stocks" className={navClass}> <HiArchive /> Stock</NavLink>
        <NavLink to="/dashboard/categories" className={navClass}> <HiTag /> Categories</NavLink>
        <NavLink to="/dashboard/users" className={navClass}> <HiUsers /> Users</NavLink>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
}