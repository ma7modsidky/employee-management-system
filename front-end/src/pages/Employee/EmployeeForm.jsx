import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ employeeData }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const selectedCompany = watch("company");
  const url = employeeData?.id
    ? `/employees/${employeeData.id}/`
    : "/employees/";

  // Prefill the form when `employeeData` changes
  useEffect(() => {
    if (employeeData) {
      // Reset the form with the fetched employee data
      reset({
        company: employeeData.company.id,
        department: employeeData.department.id,
        employee_name: employeeData.employee_name,
        email_address: employeeData.email_address,
        mobile_number: employeeData.mobile_number,
        address: employeeData.address,
        designation: employeeData.designation,
        hired_on: employeeData.hired_on,
      });

      // Set the departments for the selected company
      setDepartments([employeeData.department]);
    }
  }, [employeeData, reset]);

  useEffect(() => {
    // Fetch companies
    axios
      .get("/companies/")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      // Fetch departments for the selected company
      axios
        .get(`/departments/?company=${selectedCompany}`)
        .then((response) => setDepartments(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedCompany]);

  const onSubmit = async (data) => {
    try {
      let response;

      if (employeeData) {
        response = await axios.put(url, data);
      } else {
        response = await axios.post(url, data);
      }

      // Show success modal
      setIsSuccessModalOpen(true);

      // Redirect to employee detail page after 2 seconds
      setTimeout(() => {
        navigate(`/employee/${response.data.id}`);
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
                className={`shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
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

        {/* Department Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department"
          >
            Department
          </label>
          <Controller
            name="department"
            control={control}
            defaultValue=""
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <select
                {...field}
                className={`shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.department ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.department && (
            <p className="text-red-500 text-xs italic">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Employee Name Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="employee_name"
          >
            Employee Name
          </label>
          <Controller
            name="employee_name"
            control={control}
            defaultValue=""
            rules={{ required: "Employee Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.employee_name ? "border-red-500" : ""
                }`}
                placeholder="Employee Name"
              />
            )}
          />
          {errors.employee_name && (
            <p className="text-red-500 text-xs italic">
              {errors.employee_name.message}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email_address"
          >
            Email Address
          </label>
          <Controller
            name="email_address"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email_address ? "border-red-500" : ""
                  }`}
                  placeholder="Email Address"
                />
                {errors.email_address && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email_address.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobile_number"
          >
            Mobile Number
          </label>
          <Controller
            name="mobile_number"
            control={control}
            defaultValue=""
            rules={{
              required: "Mobile Number is required",
              pattern: {
                value:
                  /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                message: "Invalid mobile number format",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                    errors.mobile_number ? "border-red-500" : ""
                  }`}
                  placeholder="Mobile Number"
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-xs italic">
                    {errors.mobile_number.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <textarea
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Address"
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500 text-xs italic">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Designation Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="designation"
          >
            Designation
          </label>
          <Controller
            name="designation"
            control={control}
            defaultValue=""
            rules={{ required: "Designation is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.designation ? "border-red-500" : ""
                }`}
                placeholder="Designation"
              />
            )}
          />
          {errors.designation && (
            <p className="text-red-500 text-xs italic">
              {errors.designation.message}
            </p>
          )}
        </div>

        {/* Hired On Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hired_on"
          >
            Hired On
          </label>
          <Controller
            name="hired_on"
            control={control}
            defaultValue=""
            rules={{ required: "Hired On is required" }}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.hired_on ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.hired_on && (
            <p className="text-red-500 text-xs italic">
              {errors.hired_on.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-success  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button className="btn btn-error" onClick={() => navigate(-1)}>
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
        // onChange={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">
            {employeeData
              ? "Employee Updated successfully."
              : "Employee Created successfully."}
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
        // onChange={() => setIsErrorModalOpen(!isErrorModalOpen)}
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

export default EmployeeForm;
