// src/pages/Jobs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Jobs() {
  // Sample data for now (will connect to MongoDB later)
  const jobs = [
    { id: 1, title: 'Frontend Developer', location: 'Lagos, Nigeria', company: 'TechCorp' },
    { id: 2, title: 'Sales Executive', location: 'Abuja, Nigeria', company: 'SalesHub' },
    { id: 3, title: 'Graphic Designer', location: 'Kano, Nigeria', company: 'DesignPro' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
