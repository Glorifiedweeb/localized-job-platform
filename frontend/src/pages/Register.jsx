import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user role + token to localStorage (replace with API call later)
    localStorage.setItem("token", "dummy-auth-token");
    localStorage.setItem("role", role);

    // Redirect to home
    navigate("/");
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role Selection */}
          <select
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">I am an Employee</option>
            <option value="employer">I am an Employer</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;