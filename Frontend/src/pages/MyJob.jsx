import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyJobs = async () => {
      const response = await fetch(
        "https://freelancive-service-backend.onrender.com/api/activity/myjobs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        setMyJobs(data.data || []);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4  ">
        <div className="px-4 mt-6 flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">My Created Jobs</h2>
          <button
            className="bg-white text-purple-700 p-2 rounded-full hover:bg-purple-200 transition"
            onClick={() => navigate("/jobs")} // your route to job creation page
            title="Create new job"
          >
            <FaPlus />
          </button>
        </div>
        {myJobs.length === 0 ? (
          <p className="text-white text-lg">
            You haven’t created any jobs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {myJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-purple-700">
                    {job.title}
                  </h3>
                  <Link
                    to={`/jobdetails/${job._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
                <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                <p className="text-sm text-gray-600">
                  Applicants: <span className="font-semibold">{job.count}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
