import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  try {
    useEffect(() => {
      const token = localStorage.getItem("token");

      const checkToken = async () => {
        if (!token) {
          return null;
        }
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      };

      // setIsLoggedIn(checkToken);
    }, []);
  } catch (error) {
    console.error("Error checking token:", error);
  }
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl">
              Freelancive
            </Link>
          </div>

          <div className="hidden md:flex space-x-7 text-white font-medium">
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/myjob" className="hover:text-gray-200">
              Jobs
            </Link>
            {/* <Link to="/contact" className="hover:text-gray-200">Contact</Link> */}
            <div>
              {isLoggedIn ? (
                <Link
                  to="/signup"
                  className="bg-white text-purple-600 px-4 py-1 rounded-md hover:bg-gray-100 font-semibold"
                >
                  Sign Up
                </Link>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/user" className="hover:text-gray-200">
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="hover:text-gray-200"
                  >
                    Log Out{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-600 to-blue-500 px-4 py-3 space-y-2 text-white font-medium">
          <Link to="/explore" onClick={() => setIsOpen(false)}>
            Explore
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block bg-white text-purple-600 px-4 py-1 rounded-md mt-2 text-center"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
