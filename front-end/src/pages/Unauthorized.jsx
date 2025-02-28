// Unauthorized.jsx
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error">403</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Unauthorized Access
        </p>
        <p className="mt-2 text-gray-500">
          You don't have permission to view this page.
        </p>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="mt-6 btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;