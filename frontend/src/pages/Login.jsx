import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, role);
    navigate(role === "employer" ? "/employer-dashboard" : "/employee-dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2"
          required
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="border w-full p-2"
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white w-full p-2">Login</button>
      </form>
    </div>
  );
}