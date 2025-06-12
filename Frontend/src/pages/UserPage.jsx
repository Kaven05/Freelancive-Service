import { useEffect, useState } from "react";

import Navbar from "../components/navbar";

const UserPage = () => {
  const fetchUserData = async () => {
    try {
      const data = await fetch("https://freelancive-service-backend.onrender.com/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you have the token stored in localStorage
        },
      });
      const result = await data.json();
      console.log(result);
      return result.data.doc;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    skills: [],
    joined: "",
    // about: ""
  });
  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      if (data) {
        setUserData({
          name: data.name,
          email: data.email,
          skills: data.skills,
          joined: new Date(data.timestamp).toLocaleDateString(),
          // about: data.about || "No information provided",
        });
      }
    };
    getUserData();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 text-white">
      <Navbar />
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-4">
            User Profile
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium">{userData.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{userData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Skills</p>
              <div className="flex gap-2 flex-wrap">
                {userData.skills.map((skills, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skills}
                  </span>
                ))}
              </div>
            </div>
            {/* <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-lg font-medium">{userData.joined}</p>
            </div> */}

            {/* <div>
              <p className="text-sm text-gray-500">About</p>
              <p className="text-base">{userData.about}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
