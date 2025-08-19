// src/pages/PostJob.jsx
import React from "react";

const PostJob = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Job Title" className="border p-2 w-full" />
        <input type="text" placeholder="Company Name" className="border p-2 w-full" />
        <textarea placeholder="Job Description" className="border p-2 w-full"></textarea>
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
