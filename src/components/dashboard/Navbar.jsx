import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
        <h3>My App</h3>
      </div>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* SIDE MENU */}
      <div className={`sidebar ${open ? "show" : ""}`}>
        <p onClick={() => goTo("/dashboard")}>Dashboard</p>
        <p onClick={() => goTo("/upload")}>Upload Product</p>
        <p onClick={() => goTo("/products")}>View Products</p>
      </div>
    </>
  );
};

export default Navbar;