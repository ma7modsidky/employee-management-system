// AdminActions.jsx
import { Link } from "react-router-dom";

const AdminActions = () => {
  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg my-8">
      <h2 className="text-2xl font-bold mb-6">Admin Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Create New Company */}
        <Link to="/company/create">
          <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer">
            <div className="card-body items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-2">New Company</h3>
            </div>
          </div>
        </Link>

        {/* Create New Department */}
        <Link to="/department/create">
          <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer">
            <div className="card-body items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-2">New Department</h3>
            </div>
          </div>
        </Link>

        {/* Create New Employee */}
        <Link to="/employee/create">
          <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer">
            <div className="card-body items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-2">New Employee</h3>
            </div>
          </div>
        </Link>

        {/* User List */}
        <Link to="users">
          <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer">
            <div className="card-body items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-2">User List</h3>
            </div>
          </div>
        </Link>

        {/* Create New User */}
        <Link to="users/create">
          <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200 cursor-pointer">
            <div className="card-body items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <h3 className="text-xl font-semibold mt-2">New User</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminActions;