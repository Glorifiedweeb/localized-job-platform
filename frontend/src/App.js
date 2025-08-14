import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import Home from "./pages/Home";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AIResumeScreening from "./pages/AIResumeScreening";
import JobPosting from "./pages/JobPosting";
import CandidateMatching from "./pages/CandidateMatching";
import ResumeGeneration from "./pages/ResumeGeneration";
import SkillAssessment from "./pages/SkillAssessment";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Chat from "./pages/Chat";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

   return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={token ? <DashboardHome role={role}/> : <Home />} />
          <Route path="/Dashboard-Home" element={<DashboardHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/resume-screening" element={<AIResumeScreening />} />
          <Route path="/post-job" element={<JobPosting />} />
          <Route path="/candidate-matching" element={<CandidateMatching />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/resume-generation" element={<ResumeGeneration />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
