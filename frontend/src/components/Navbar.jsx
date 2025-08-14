import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // Ensure your logo is saved in src/assets/logo.png

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="HIRE.IO logo"
            className="h-40 w-40 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-bold text-2xl tracking-wide">
            HIRE.IO
          </span>
        </Link>

        {/* Nav Links */} 
        <div className="flex items-center space-x-6">
          {user ? (
            <>
             <Link to="/Dashboard-Home" className="hover:text-blue-600">Dashboard Home</Link>
              <span className="text-sm">
                Hello, <span className="font-semibold">{user.name}</span> ({user.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}