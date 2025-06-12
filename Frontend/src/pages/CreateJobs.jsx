import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
const CreateJob = () => {
  const url = "https://freelancive-service-backend.onrender.com";
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const res= await fetch(`${url}/api/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.status == "success") {
      alert("Job created successfully!");
    } else {
      alert("Failed to create job. Please try again.");
    }
    setForm({
      title: "",
      description: "",
      skills: "",
    });
    navigate("/home");
    }catch(err){
  console.log("k");
  alert("An error occurred while creating the job. Please try again.");
}
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 text-white">
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Create New Job
          </h2>

          <form  className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <select
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select a Skill</option>
              <option value="Python">Python</option>
              <option value="ML">Machine Learning</option>
              <option value="Java">Java</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:opacity-90"
              onChange={handleSubmit}
            >
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
