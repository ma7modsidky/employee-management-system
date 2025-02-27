import { Link, useParams, useLocation } from "react-router-dom";

const Navigation = () => {
  const { companyId, departmentId } = useParams();
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base-100 p-4 rounded-lg shadow-sm my-4">
      <ul className="flex space-x-4">
        {/* Link to Company Detail */}
        <li>
          <Link
            to={`/company/${companyId}`}
            className={`px-4 py-2 rounded ${
              isActive(`/company/${companyId}`) ? "bg-blue-500 text-white" : "bg-base-300"
            }`}
          >
            Company Details
          </Link>
        </li>

        {/* Link to Department List */}
        <li>
          <Link
            to={`/company/${companyId}/department`}
            className={`px-4 py-2 rounded ${
              isActive(`/company/${companyId}/department`)
                ? "bg-blue-500 text-white"
                : "bg-base-300"
            }`}
          >
            Departments
          </Link>
        </li>

        {/* Link to Employee List (only shown if a department is selected) */}
        {departmentId && (
          <li>
            <Link
              to={`/company/${companyId}/department/${departmentId}/employee`}
              className={`px-4 py-2 rounded ${
                isActive(`/company/${companyId}/department/${departmentId}/employee`)
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              Employees
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;