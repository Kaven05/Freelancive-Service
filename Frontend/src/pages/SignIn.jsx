import { useEffect, useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://freelancive-service-backend.onrender.com/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
        console.log("Response status:", response);
      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 flex flex-col items-center justify-center">
      <div className="text-white text-center mb-6">
        <div className="text-4xl font-bold">Freelancive</div>
        <p className="mt-2 text-lg">Where Talent Meets Opportunity</p>
      </div>

      <div className="bg-white w-80 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md text-lg font-semibold"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <div className="text-center text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </div>

          <div className="text-center my-3 text-gray-500">or continue with</div>

          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-red-100 rounded-full">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 bg-black rounded-full">
              <FaApple className="text-white" />
            </button>
            <button className="p-2 bg-blue-100 rounded-full">
              <FaFacebookF className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
