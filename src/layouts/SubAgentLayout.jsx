import { Outlet, NavLink } from "react-router-dom";
import {
  HiHome,
  HiUpload,
  HiViewGrid,
  HiCurrencyDollar,
  HiUser
} from "react-icons/hi";

export default function SubAgentLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4 hidden md:block">

        <h2 className="text-2xl font-bold mb-6">Sub Agent</h2>

        <nav className="space-y-3">

          <NavLink
            to="/subagent"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/subagent/upload"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiUpload />
            Upload Products
          </NavLink>

          <NavLink
            to="/subagent/products"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiViewGrid />
            View Products
          </NavLink>

          <NavLink
            to="/subagent/wallet"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiCurrencyDollar />
            Wallet
          </NavLink>

          <NavLink
            to="/subagent/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiUser />
            Profile
          </NavLink>

        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}