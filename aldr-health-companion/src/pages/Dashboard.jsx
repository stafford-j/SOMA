import React from "react";
import { Link } from "react-router-dom";

/**
 * Dashboard page: placeholder for now
 */
const Dashboard = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Soma Companion Dashboard</h1>

      {/* Link to Add Record page */}
      <Link to="/add-record">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Add New Record
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
