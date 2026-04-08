import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiHome,
  HiUpload,
  HiViewGrid,
  HiCurrencyDollar,
  HiUser,
  HiMenu
} from "react-icons/hi";

export default function SubAgentLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">

      {/* MOBILE HEADER */}
      <div className="fixed top-0 left-0 w-full bg-black text-white p-4 flex items-center md:hidden z-50">
        <button onClick={() => setOpen(true)}>
          <HiMenu size={24} />
        </button>
        <h2 className="ml-4 text-lg font-bold">Sub Agent</h2>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white p-4 z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-2xl font-bold mb-6">Sub Agent</h2>

        <nav className="space-y-3">

           {/* ADMIN BUTTON */}
          <div
            onClick={() => {
              localStorage.setItem("role", "admin");
              navigate("/dashboard");
            }}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-white-400 hover:bg-gray-800"
          >
            <HiHome /> Admin Dashboard
          </div>

                {/* DASHBOARD */}
          <NavLink 
          to="/subagent" end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiHome /> Dashboard
          </NavLink>

           {/* UPLOAD */}

          <NavLink to="/subagent/upload"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiUpload /> Upload Products
          </NavLink>

            {/*  PRODUCTS */}
          <NavLink to="/subagent/products"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiViewGrid /> View Products
          </NavLink>

            {/* WALLET */}

          <NavLink to="/subagent/wallet"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiCurrencyDollar /> Wallet
          </NavLink>

            {/* PROFILE */}

          <NavLink to="/subagent/profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            <HiUser /> Profile
          </NavLink>

        </nav>

        
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6 mt-14 md:mt-0">
        <Outlet />
      </div>

    </div>
  );
}