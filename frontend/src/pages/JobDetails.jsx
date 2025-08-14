// src/pages/JobDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();

  // Example job data (later from DB)
  const job = {
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Lagos, Nigeria',
    description: 'We are looking for a skilled frontend developer proficient in React.js and Tailwind CSS...',
    requirements: ['2+ years experience', 'React.js knowledge', 'Good teamwork skills'],
    salary: '₦250,000 / month',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="mt-4">{job.description}</p>

      <h2 className="text-xl font-semibold mt-6">Requirements</h2>
      <ul className="list-disc list-inside">
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      <p className="mt-4 font-semibold">Salary: {job.salary}</p>

      <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Apply Now
      </button>
    </div>
  );
}

export default JobDetails;
