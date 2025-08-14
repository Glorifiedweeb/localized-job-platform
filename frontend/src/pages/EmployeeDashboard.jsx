import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  if (!user || user.role !== "employee") return <h1>Access Denied</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Employee Dashboard</h1>
      <ul className="space-y-2">
        <li><Link to="/resume-generation" className="text-blue-600">AI Resume Generation</Link></li>
        <li><Link to="/skill-assessment" className="text-blue-600">Skill Assessment</Link></li>
        <li><Link to="/chat" className="text-blue-600">Chat with Employers</Link></li>
        <li><Link to="/jobs" className="text-blue-600">Jobs</Link></li>
      </ul>
    </div>
  );
}
