import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation(); // 🔥 to highlight active menu

  const menuItems = [
    { name: "Analytics", path: "/dashboard/analytics", icon: "📊" },
    { name: "Products", path: "/dashboard/products", icon: "📦" },
    { name: "Stock", path: "/dashboard/stocks", icon: "📉" },
    { name: "Orders", path: "/dashboard/orders", icon: "🛒" },
    { name: "Categories", path: "/dashboard/categories", icon: "🏷️" },
    { name: "Users", path: "/dashboard/users", icon: "👤" },
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-900 text-white min-h-screen p-5 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {open && <h2 className="text-xl font-bold">Admin Dashboard</h2>}

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-xl hover:scale-110 transition"
        >
          ☰
        </button>
      </div>

      {/* Menu */}
      <ul className="space-y-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {open && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}