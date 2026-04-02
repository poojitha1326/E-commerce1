import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        loginData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

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
            className={`w-1/2 py-2 font-semibold ${
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
            className={`w-1/2 py-2 font-semibold ${
              activeTab === "signup"
                ? "bg-blue-900 text-white"
                : "text-black"
            }`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Form
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 px-3 py-2 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-2 rounded-lg"
        >
          Login
        </button>

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