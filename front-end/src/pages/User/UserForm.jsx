import { useForm, Controller } from "react-hook-form";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserForm = ({ userData }) => {
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
  const url = userData?.id ? `/users/${userData.id}/` : "/users/register/";
  console.log(userData);
  // Prefill the form when `userData` changes
  useEffect(() => {
    if (userData) {
      reset({
        user_name: userData.user_name,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (userData) {
        // If editing an existing user, exclude the password field
        const { password, ...userDataWithoutPassword } = data;
        response = await axios.put(url, userDataWithoutPassword);
      } else {
        // If creating a new user, include the password field
        response = await axios.post(url, data);
      }

      // Show success modal
      setIsSuccessModalOpen(true);

      // Redirect to user detail page after 2 seconds
      setTimeout(() => {
        navigate(`/users/${response.data.id}`);
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
        {/* Username Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user_name"
          >
            Username
          </label>
          <Controller
            name="user_name"
            control={control}
            defaultValue=""
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.user_name ? "border-red-500" : ""
                }`}
                placeholder="Username"
              />
            )}
          />
          {errors.user_name && (
            <p className="text-red-500 text-xs italic">
              {errors.user_name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <select
                {...field}
                className={`shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.role ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-xs italic">{errors.role.message}</p>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Name"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Password Field (Only for new users) */}
        {!userData && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

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
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">
            {userData
              ? "User Updated successfully."
              : "User Created successfully."}
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
              className="bstn btn-error"
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

export default UserForm;