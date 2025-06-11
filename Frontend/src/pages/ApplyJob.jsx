import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

// Sample job data (replace with actual API later)
// const job = {
//   j1: {
//     title: "Frontend Developer",
//     description: "We’re looking for a skilled React developer.",
//     skills: ["React", "HTML", "CSS"]
//   },
//   j2: {
//     title: "Data Scientist",
//     description: "Experience in Python and Machine Learning required.",
//     skills: ["Python", "ML", "Data Analysis"]
//   }
// };

const ApplyJob = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [job,setJobs] = useState({
    title: "",
    description: "",
    skills: []
  });
const [form,setForm] = useState({activityId:""})

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/activity/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("Fetched jobs:", data);
      setJobs(data.data || []);
      
      form.activityId=data.data._id
      console.log("Form data:",form);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  fetchJobs();
}, []);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch("http://localhost:5000/api/request", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(form)
    });
    const data = await res.json();
    console.log("Response data:", data);  

   
    if(res.status === 201){
      alert("Application submitted successfully!");
      Navigate("/home");
    }else{
      alert("Failed to submit application. Please try again.");
    }
    // For demonstration, we'll just log the data
    // and show a success message
    // console.log("Application data:", applicationData);
    // For demonstration, we'll just log the data
    // and show a success message
    console.log("Applied with:", formData);
   
  };

  if (!job) return <p className="text-white">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-2">{job.title}</h2>
        <p className="mb-4">{job.description}</p>

        <h3 className="font-semibold text-purple-700 mb-2">Required Skills</h3>
        <div className="flex gap-2 mb-6">
            <span
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {job.skills}
            </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            // not required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            // not required
            className="w-full px-4 py-2 border rounded-md"/>
          <textarea
            name="message"
            placeholder="Why are you a good fit?"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
