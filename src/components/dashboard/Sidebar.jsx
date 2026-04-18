import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Analytics", path: "/dashboard/analytics", icon: "📊" },
    { name: "Products", path: "/dashboard/products", icon: "📦" },
    { name: "Stock", path: "/dashboard/stocks", icon: "📉" },
    { name: "Orders", path: "/dashboard/orders", icon: "🛒" },
    { name: "Categories", path: "/dashboard/categories", icon: "🏷️" },
    { name: "Users", path: "/dashboard/users", icon: "👤" },
  ];

  return (
    <>
      {/* Overlay (Mobile only background) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-gray-900 text-white p-5
          fixed top-0 left-0 h-screen w-64 z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300

          md:translate-x-0 md:static md:block
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>

          {/* Close button (Mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
          >
            ✖
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
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 p-2 rounded-lg transition ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}