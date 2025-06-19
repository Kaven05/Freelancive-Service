import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const JobDetails = () => {
  const url = "https://freelancive-service-backend.onrender.com";
  // const url = "http://localhost:5000";
  const { id } = useParams();
  const [job, setJob] = useState({
    title: "",
    description: "",
    skills: [],
  });
  const [applicants, setApplicants] = useState([]);

  const fetchUserData = async (userid) => {
    try {
      const res = await fetch(`${url}/api/user/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log("User data:", result);
      return result.data.doc;
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${url}/api/activity/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 201) {
          const result = await res.json();
          setJob(result.data);
          console.log("Job details:", job);
        } else {
          throw new Error("Failed to fetch job details");
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchJobAndApplicants = async () => {
      try {
        const res = await fetch(`${url}/api/request/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 201) {
          const result = await res.json();
          console.log("Applicants data:", result.data);
          const applicantList = result.data;
          const applicantDetails = await Promise.all(
            applicantList.map((userId) => fetchUserData(userId))
          );
          setApplicants(applicantDetails.filter(Boolean));
        } else {
          throw new Error("Failed to fetch job details");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobAndApplicants();
    fetchJob();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8 rounded-xl shadow-xl mt-8">
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700">{job.title}</h2>
          <Link
            to={`/edit-job/${job._id}`}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Edit Job
          </Link>
        </div> */}

        <p className="mb-4">{job.description}</p>

        <div className="mb-6">
          <p className="text-sm text-gray-600 font-medium">Skills Required:</p>
          <div className="flex gap-2 mt-1">
            {/* {job.skills?.map((skill, i) => ( */}
            <span
              // key={i}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {job.skills}
            </span>
            {/* ))} */}
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          Applicants ({applicants.length})
        </h3>
        <div className="space-y-4">
          {applicants.map((user, i) => (
            <div
              key={user._id || i}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex gap-2 mt-1">
                  {user.skills?.map((skill, j) => (
                    <span
                      key={j}
                      className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* <Link
                to={`/user/${user._id}`}
                className="text-blue-600 hover:underline"
              >
                View Profile
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
