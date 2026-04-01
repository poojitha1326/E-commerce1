import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-1/2 py-2 bg-gray-200 rounded-l-lg"
          >
            Login
          </button>
          <button className="w-1/2 py-2 bg-blue-900 text-white rounded-r-lg">
            Signup
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-5 px-3 py-2 border rounded-lg"
        />

        <button
          className="w-full bg-blue-900 text-white py-2 rounded-lg"
        >
          Signup
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer font-semibold"

          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}