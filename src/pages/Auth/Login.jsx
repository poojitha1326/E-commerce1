import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        
        {/* Tabs */}
        <div className="flex mb-6 bg-gray-200 rounded-lg overflow-hidden">
          
          <button
            onClick={() => {
              setActiveTab("login");
              navigate("/");
            }}
            className={`w-1/2 py-2 font-semibold transition ${
              activeTab === "login"
                ? "bg-blue-900 text-white"
                : "text-black"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setActiveTab("signup");
              navigate("/signup");
            }}
            className={`w-1/2 py-2 font-semibold transition ${
              activeTab === "signup"
                ? "bg-blue-900 text-white"
                : "text-black"
            }`}
          >
            Signup
          </button>

        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Form
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-3 py-2 border rounded-lg"
        />

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-900 text-white py-2 rounded-lg"
        >
          Login
        </button>

        {/* Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}