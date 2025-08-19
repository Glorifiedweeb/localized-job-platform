import React, { useEffect, useState } from "react";
import API from "../utils/api";

const EmployerApplications = () => {
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    try {
      const res = await API.get("/applications/employer");
      setApps(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Update application status
  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/applications/${id}/status`, { status });
      fetchApps(); // refresh list
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Applications for My Jobs</h1>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map((app) => (
          <div key={app._id} className="p-4 border rounded mb-4">
            <h3 className="text-xl font-semibold">
              {app.jobId?.title} – <span className="text-gray-600">{app.jobId?.company}</span>
            </h3>
            <p>
              Applicant: <strong>{app.applicantId?.name}</strong> ({app.applicantId?.email})
            </p>
            <p>Cover Letter: {app.coverLetter || "N/A"}</p>
            <p>Expected Salary: {app.expectedSalary || "N/A"}</p>
            {app.resume && (
              <a
                href={`http://localhost:5000/uploads/resumes/${app.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            )}

            <p className="mt-2">
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

            {/* ✅ Accept/Reject Buttons */}
            <div className="mt-3 space-x-2">
              <button
                onClick={() => handleStatusUpdate(app._id, "Accepted")}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(app._id, "Rejected")}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployerApplications;
