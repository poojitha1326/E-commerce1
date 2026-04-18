import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/analytics");
    }
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};
    const isMobile = /^[0-9]{10}$/;

    if (!loginData.mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!isMobile.test(loginData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit Mobile number";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // LOGIN FUNCTION
  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          mobile: loginData.mobile,
          password: loginData.password
        }
      );

      console.log("Login Success:", res.data);

      const token = res.data?.token || res.data?.data?.token;
      const user = res.data?.user || res.data?.data?.user;

      if (token) {
        //  STORE TOKEN
        localStorage.setItem("token", token);

        //  STORE ROLE (IMPORTANT)
        if (user?.role) {
          localStorage.setItem("role", user.role);
        }

        //  NAVIGATION BASED ON ROLE
        if (user?.role === "subagent") {
          navigate("/subagent");
        } else {
          navigate("/dashboard/analytics");
        }

      } else {
        setErrors({ api: "Login Failed" });
      }

    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error.response?.data?.message || "Login Failed. Try again.";

      setErrors({ api: message });
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

        {/* MOBILE */}
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={loginData.mobile}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded-lg"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile}</p>
        )}

        {/* PASSWORD */}
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

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-500 text-sm text-center">{errors.api}</p>
        )}

        {/* BUTTON */}
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