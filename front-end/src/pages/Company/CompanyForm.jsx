import { useForm, Controller } from "react-hook-form";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CompanyForm = ({ companyData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const url = companyData?.id ? `/companies/${companyData.id}/` : "/companies/";
  console.log(companyData);
  // Prefill the form when `companyData` changes
  useEffect(() => {
    if (companyData) {
      reset({
        company_name: companyData.company_name,
      });
    }
  }, [companyData, reset]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (companyData) {
        response = await axios.put(url, data);
      } else {
        response = await axios.post(url, data);
      }

      // Show success modal
      setIsSuccessModalOpen(true);

      // Redirect to company detail page after 2 seconds
      setTimeout(() => {
        navigate(`/company/${response.data.id}`);
      }, 2000);
    } catch (error) {
      // Set error message and show error modal
      if (error.response?.data) {
        // Check if the error response has a 'message' field (text error)
        if (error.response.data.message) {
          setErrorMessage([error.response.data.message]);
        }
        // Check if the error response is an object with key-value pairs
        else if (typeof error.response.data === "object") {
          const errorMessages = Object.entries(error.response.data).map(
            ([key, value]) => `${key}: ${value}`
          );
          setErrorMessage(errorMessages);
        }
        // Handle unexpected error response format
        else {
          setErrorMessage(["An error occurred"]);
        }
      }
      // Handle cases where there is no response data
      else {
        setErrorMessage(["An error occurred"]);
      }

      // Open the error modal
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Company Name Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company_name"
          >
            Company Name
          </label>
          <Controller
            name="company_name"
            control={control}
            defaultValue=""
            rules={{ required: "Company Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.company_name ? "border-red-500" : "border-gray-300"
                } ${
                  document.documentElement.classList.contains("dark")
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-gray-700 placeholder-gray-500"
                }`}
                placeholder="Company Name"
              />
            )}
          />
          {errors.company_name && (
            <p className="text-red-500 text-xs italic">
              {errors.company_name.message}
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
        
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">
            {companyData
              ? "Company Updated successfully."
              : "Company Created successfully."}
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

export default CompanyForm;
