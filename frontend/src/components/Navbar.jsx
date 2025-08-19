// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">Hire.io</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
