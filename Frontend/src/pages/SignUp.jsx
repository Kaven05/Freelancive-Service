import { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });
  const router = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.skills
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("https://freelancive-service-backend.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status == 201) {
        const data = await res.json();
        alert("Sign Up Successful!");
        localStorage.setItem("token", data.token);
        router("/home");
      } else {
        const errorData = await res.json();
        console.log(errorData);
        alert(`Error: ${errorData.data}`);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 flex flex-col items-center justify-center">
      <div className="text-white text-center mb-6">
        <div className="text-4xl font-bold">Freelancive</div>
        <p className="mt-2 text-lg">Join and Unlock Opportunities</p>
      </div>

      <div className="bg-white w-80 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <select
            name="skills"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required

            value={formData.skills}
            onChange={handleChange}
          >
            <option value="">Select a skill</option>
            <option value="Python">Python</option>
            <option value="ML">ML</option>
            <option value="Web Development">Web Development</option>
            <option value="Java">Java</option>
          </select>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md text-lg font-semibold"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          <div className="text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </div>

          <div className="text-center my-3 text-gray-500">or sign up with</div>

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
