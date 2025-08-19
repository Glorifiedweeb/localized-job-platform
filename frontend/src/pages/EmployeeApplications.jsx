import React, { useEffect, useState } from "react";
import API from "../utils/api";

const EmployeeApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await API.get("/applications/employee");
        setApps(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map((app) => (
          <div key={app._id} className="p-4 border rounded mb-3">
            <h2 className="text-xl font-semibold">{app.jobId?.title}</h2>
            <p className="text-gray-600">{app.jobId?.company}</p>
            <p>Status: {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeApplications;
