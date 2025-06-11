import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import JobCard from "../components/JobCard.jsx";
import Navbar from "../components/navbar.jsx";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activity", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("Fetched jobs:", data);
        setJobs(data.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <div className="p-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <IoMdSearch className="text-xl text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            className="flex-1 bg-transparent outline-none"
          />
          <CiSettings className="text-xl text-purple-700" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {["Flutter", "UI/UX", "Backend", "AI/ML"].map((name, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-xl shadow"
            >
              <div className="text-lg font-medium">{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recommended Jobs</h2>
          <span className="text-purple-600 text-sm">See All</span>
        </div>

        <div className="space-y-4 mt-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <JobCard
                jobid={job._id}
                title={job.title}
                description={job.description}
                skills={job.skills}
                count={job.count}
                postedBy={job.ownerId?.fullname || "Unknown"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
