// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeApplications from "./pages/EmployeeApplications";
import EmployerApplications from "./pages/EmployerApplications";
import ChatEmployee from "./pages/ChatEmployee";
import ChatEmployer from "./pages/ChatEmployer";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplicationForm from "./pages/ApplicationForm";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/applications" element={<EmployeeApplications />} />
        <Route path="/employee/chat" element={<ChatEmployee />} />

        {/* Employer */}
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/applications" element={<EmployerApplications />} />
        <Route path="/employer/chat" element={<ChatEmployer />} />
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route path="/employer/manage-jobs" element={<ManageJobs />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/apply" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
