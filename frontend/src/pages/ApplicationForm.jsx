import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const ApplicationForm = () => {
  const { id } = useParams(); // jobId
  const navigate = useNavigate();
  const [form, setForm] = useState({
    coverLetter: "",
    expectedSalary: "",
  });
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form data with file upload
      const formData = new FormData();
      formData.append("coverLetter", form.coverLetter);
      formData.append("Email Address", form.EmailAddress);
      formData.append("Location", form.StateOrigin);
      formData.append("expectedSalary", form.expectedSalary);
      formData.append("resume", resume);

      await API.post(`/applications/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Application submitted!");
      navigate("/employee/applications");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error submitting application");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Job Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="coverLetter"
          placeholder="Write your cover letter..."
          value={form.coverLetter}
          onChange={handleChange}
          className="w-full border p-2"
          rows="5"
        />
        <input
          type="text"
          name="Email Address"
          placeholder="Email Address"
          value={form.EmailAddress}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="First Name"
          placeholder="First Name"
          value={form.FiratName}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="SurnName"
          placeholder="SurnName"
          value={form.SurnName}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="Location"
          placeholder="State of origin"
          value={form.StateOrigin}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={form.Address}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="expectedSalary"
          placeholder="Expected Salary (optional)"
          value={form.expectedSalary}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input type="file" onChange={handleFileChange} className="w-full" />
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
