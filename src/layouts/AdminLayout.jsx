import { Outlet, NavLink } from "react-router-dom";
import {
  HiChartBar,
  HiShoppingBag,
  HiUsers,
  HiTag,
  HiArchive
} from "react-icons/hi";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4">

        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-3">

          {/* Analytics */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <HiChartBar className="text-xl" />
            Analytics
          </NavLink>

          {/* Products */}
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <HiShoppingBag className="text-xl" />
            Products
          </NavLink>

          {/* Stock */}
          <NavLink
            to="/dashboard/stock"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <HiArchive className="text-xl" />
            Stock
          </NavLink>

          {/* Categories */}
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <HiTag className="text-xl" />
            Categories
          </NavLink>

          {/* Users */}
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <HiUsers className="text-xl" />
            Users
          </NavLink>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}