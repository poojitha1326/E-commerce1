import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

            // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    // credentials format validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMobile = /^[0-9]{10}$/;

     // username validation
    if (!loginData.username) {
      newErrors.username = "Email or Mobile is required";
    } else if (
      !isEmail.test(loginData.username) &&
      !isMobile.test(loginData.username)
    ) {
      newErrors.username = "Enter valid Email or Mobile";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login function
  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {

      // Create payload for backend
      const payload = {
        mobile: loginData.username,          // backend email
        password: loginData.password
      };

      // API call to backend

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Login Success:", res.data);
    
      // store token 
      const token = res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/dashboard/analytics");

    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error.response?.data?.message || "Login Failed. Try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Form
        </h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Email or Mobile"
          value={loginData.username}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded-lg"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full mt-3 mb-2 px-3 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded-lg mt-3 text-white ${
            loading ? "bg-gray-400" : "bg-blue-900"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}