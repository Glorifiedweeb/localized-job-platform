import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });
  const navigate = useNavigate();

  // Fetch employer's jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;
      const employerJobs = res.data.filter((job) => job.employerId === userId);
      setJobs(employerJobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", form);
      setForm({ title: "", company: "", description: "" });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Error posting job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          Logout
        </button>
      </div>

      {/* Link to applications */}
      <div className="mb-6">
        <Link
          to="/employer/applications"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          View Applications
        </Link>
      </div>

      {/* Post Job Form */}
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-6">
        <input
          name="title"
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="company"
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
          Post Job
        </button>
      </form>

      {/* Job List */}
      <h2 className="text-2xl font-semibold mb-4">My Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} className="p-4 border rounded mb-3">
          <h3 className="text-xl">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployerDashboard;
