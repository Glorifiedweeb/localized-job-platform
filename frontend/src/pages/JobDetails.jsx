import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p className="p-6">Loading job details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.company}</p>
      <p className="text-gray-800">{job.description}</p>

      <button
        onClick={() => navigate(`/jobs/${job._id}/apply`)}
        className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
