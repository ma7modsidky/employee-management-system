
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AdminActions from "../components/Dashboard/AdminActions";
import { useEffect, useState } from "react";
import axios from "../axios";
const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({ companies: 0, departments: 0, employees: 0 })
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("/counts/");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div className="p-6 bg-base-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <button
          onClick={logoutUser}
          className="btn btn-error text-white"
        >
          Logout
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to='company'>
        {/* Companies Card */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Companies</h2>
            <p className="text-4xl font-bold">{analyticsData.companies}</p>
            <p className="text-sm">Total number of companies</p>
          </div>
        </div>
        </Link>

        {/* Departments Card */}
        <Link to='department'>
        <div className="card bg-gradient-to-r from-green-500 to-green-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Departments</h2>
            <p className="text-4xl font-bold">{analyticsData.departments}</p>
            <p className="text-sm">Total number of departments</p>
          </div>
        </div>
        </Link>

        {/* Employees Card */}
        <Link to='employee'>
        <div className="card bg-gradient-to-r from-purple-500 to-purple-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Employees</h2>
            <p className="text-4xl font-bold">{analyticsData.employees}</p>
            <p className="text-sm">Total number of employees</p>
          </div>
        </div>
        </Link>

        {/* My Account Card */}
        {/* <Link to='account'>
        <div className="card bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">My Account</h2>
            <p className="text-4xl font-bold">{analyticsData.employees}</p>
            <p className="text-sm">Total number of employees</p>
          </div>
        </div>
        </Link> */}
      </div>

      {/* Conditionally Render Admin Actions */}
      {(user?.role === "admin" || user?.role === "manager") && <AdminActions />}
    </div>
  );
};

export default Dashboard;