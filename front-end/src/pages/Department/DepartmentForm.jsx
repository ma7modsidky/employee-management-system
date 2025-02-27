import { useForm, Controller } from "react-hook-form";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DepartmentForm = ({ departmentData }) => {
  console.log(departmentData);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [companies, setCompanies] = useState([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const url = departmentData?.id ? `/departments/${departmentData.id}/` : "/departments/";

  // Fetch companies
  useEffect(() => {
    axios
      .get("/companies/")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Prefill the form when `departmentData` changes
  useEffect(() => {
    if (departmentData) {
      reset({
        company: departmentData.company.id,
        department_name: departmentData.department_name,
      });
    }
  }, [departmentData, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response;
      if (departmentData) {
        response = await axios.put(url, data);
      } else {
        response = await axios.post(url, data);
      }

      // Show success modal
      setIsSuccessModalOpen(true);

      // Redirect to department detail page after 2 seconds
      setTimeout(() => {
        navigate(`/department/${response.data.id}`);
      }, 2000);
    } catch (error) {
      // Set error message and show error modal
      if (error.response.data.message) {
        setErrorMessage([error.response?.data?.message]);
      } else if (error.response?.data) {
        const errorMessages = Object.entries(error.response.data).map(
          ([key, value]) => `${key}: ${value}`
        );
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage(["An error occurred"]);
      }
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Company Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company"
          >
            Company
          </label>
          <Controller
            name="company"
            control={control}
            defaultValue=""
            rules={{ required: "Company is required" }}
            render={({ field }) => (
              <select
                {...field}
                className={`shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                  errors.company ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.company && (
            <p className="text-red-500 text-xs italic">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Department Name Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department_name"
          >
            Department Name
          </label>
          <Controller
            name="department_name"
            control={control}
            defaultValue=""
            rules={{ required: "Department Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                  errors.department_name ? "border-red-500" : ""
                }`}
                placeholder="Department Name"
              />
            )}
          />
          {errors.department_name && (
            <p className="text-red-500 text-xs italic">
              {errors.department_name.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-success text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <input
        type="checkbox"
        id="success-modal"
        className="modal-toggle"
        checked={isSuccessModalOpen}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">
            {departmentData ? "Department Updated successfully." : "Department Created successfully."}
          </p>
          <div className="modal-action">
            <label
              htmlFor="success-modal"
              className="btn btn-success"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Close
            </label>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <input
        type="checkbox"
        id="error-modal"
        className="modal-toggle"
        checked={isErrorModalOpen}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error!</h3>
          <div className="py-4">
            {Array.isArray(errorMessage) ? (
              <ul className="list-disc list-inside">
                {errorMessage.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            ) : (
              <p>{errorMessage}</p>
            )}
          </div>
          <div className="modal-action">
            <label
              htmlFor="error-modal"
              className="btn btn-error"
              onClick={() => setIsErrorModalOpen(false)}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;