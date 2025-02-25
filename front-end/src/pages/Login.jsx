import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const { loginUser, err  } = useAuth();
  const location = useLocation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailValid(validateEmail(email));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = location.state?.from?.pathname || '/'
    // Handle form submission
    try {
      await loginUser(email, password, from);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-svh bg-base-300">
      <div className="max-w-md w-full p-8 bg-base-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`input input-bordered w-full ${emailValid ? "border-green-500" : "border-red-500"}`}
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
            <input
              className="input input-bordered w-full"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-2 right-0 px-3 py-1 text-gray-600 focus:outline-none"
              onClick={handlePasswordToggle}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            </div>
            
          </div>
          <button className="btn btn-success text-white w-full" type="submit">
            Login
          </button>
          {err ? (
              <div>
                {Object.keys(err).map((errr, index) => (
                  <div
                    key={index}
                    className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    <span className="font-medium">{errr} </span>
                    {err[errr]}
                  </div>
                ))}
              </div>
            ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
