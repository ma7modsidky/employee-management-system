
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logoutUser } = useAuth();

  // Mock data for analytics (replace with actual data from your backend)
  const analyticsData = {
    companies: 12,
    departments: 45,
    employees: 1200,
  };

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
        {/* Companies Card */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Companies</h2>
            <p className="text-4xl font-bold">{analyticsData.companies}</p>
            <p className="text-sm">Total number of companies</p>
          </div>
        </div>

        {/* Departments Card */}
        <div className="card bg-gradient-to-r from-green-500 to-green-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Departments</h2>
            <p className="text-4xl font-bold">{analyticsData.departments}</p>
            <p className="text-sm">Total number of departments</p>
          </div>
        </div>

        {/* Employees Card */}
        <div className="card bg-gradient-to-r from-purple-500 to-purple-400 shadow-lg text-white">
          <div className="card-body">
            <h2 className="card-title text-2xl">Employees</h2>
            <p className="text-4xl font-bold">{analyticsData.employees}</p>
            <p className="text-sm">Total number of employees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;