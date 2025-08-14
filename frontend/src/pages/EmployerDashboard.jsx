import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployerDashboard() {
  const { user } = useAuth();
  if (!user || user.role !== "employer") return <h1>Access Denied</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Employer Dashboard</h1>
      <ul className="space-y-2">
        <li><Link to="/post-job" className="text-blue-600">Post a Job</Link></li>
        <li><Link to="/resume-screening" className="text-blue-600">AI Resume Screening</Link></li>
        <li><Link to="/candidate-matching" className="text-blue-600">Candidate Matching</Link></li>
        <li><Link to="/chat" className="text-blue-600">Chat with Applicants</Link></li>
      </ul>
    </div>
  );
}
