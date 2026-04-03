import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      if (value.length <= 10) {
        setLoginData({ ...loginData, [name]: value });
      }
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMobile = /^[0-9]{10}$/;

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

  // ✅ FIXED LOGIN
  const handleLogin = () => {
    if (!validate()) return;

    // 🚀 Direct redirect
    navigate("/dashboard/analytics");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login Form
        </h2>

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

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="w-full mt-3 mb-2 px-3 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-2 rounded-lg mt-3"
        >
          Login
        </button>

      </div>
    </div>
  );
}