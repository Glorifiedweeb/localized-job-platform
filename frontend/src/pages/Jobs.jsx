import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="p-4 border rounded mb-4">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <Link to={`/jobs/${job._id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
