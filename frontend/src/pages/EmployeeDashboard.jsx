import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const EmployeeDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  // Fetch jobs & applications
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchApps = async () => {
      try {
        const res = await API.get("/applications/employee");
        setApps(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
    fetchApps();
  }, []);

  const hasApplied = (jobId) => {
    return apps.some((app) => app.jobId?._id === jobId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Available Jobs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
          {jobs.length === 0 ? (
            <p>No jobs available right now.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="p-4 border rounded mb-4">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="mb-2">{job.description}</p>

                {hasApplied(job._id) ? (
                  <p className="text-green-600 font-semibold">
                    ✅ Already Applied
                  </p>
                ) : (
                  <Link
                    to={`/jobs/${job._id}`}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            ))
          )}
        </div>

        {/* My Applications */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
          {apps.length === 0 ? (
            <p>You haven’t applied to any jobs yet.</p>
          ) : (
            apps.map((app) => (
              <div key={app._id} className="p-4 border rounded mb-3">
                <h3 className="text-lg font-semibold">
                  <Link
                    to={`/jobs/${app.jobId?._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {app.jobId?.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{app.jobId?.company}</p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      app.status === "Accepted"
                        ? "text-green-600 font-semibold"
                        : app.status === "Rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {app.status}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* === Extra Features Section === */}
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* AI Resume Builder */}
        <div className="p-6 border rounded shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-3">AI Resume Builder</h2>
          <p className="text-gray-600 mb-4">
            Generate a professional resume automatically using AI.  
            Upload your details and let AI structure it for you.
          </p>
          <Link
            to="/employee/resume-builder"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Build Resume
          </Link>
        </div>

        {/* Skill Assessments */}
        <div className="p-6 border rounded shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-3">Skill Assessments</h2>
          <p className="text-gray-600 mb-4">
            Take AI-driven skill assessments and strengthen your profile.
          </p>
          <Link
            to="/employee/assessments"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Start Assessment
          </Link>
        </div>

        {/* Resume Generation */}
        <div className="p-6 border rounded shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-3">Resume Generator</h2>
          <p className="text-gray-600 mb-4">
            Upload your experience and instantly generate multiple resume styles.
          </p>
          <Link
            to="/employee/resume-generation"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Generate Resume
          </Link>
        </div>

        {/* Chat System */}
        <div className="p-6 border rounded shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-3">Chat with Employers</h2>
          <p className="text-gray-600 mb-4">
            Communicate directly with employers via secure real-time chat.
          </p>
          <Link
            to="/employee/chat"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Open Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
