import { createContext, useContext, useState } from "react";
import axios from "../axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("access_token")
      ? jwtDecode(localStorage.getItem("access_token"))
      : null
  );


  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // const loginUser = async (email, password) => {
  //   try {
  //     const response = await axios.post("users/token/", {
  //       email,
  //       password,
  //     });
  //     // alert(jwtDecode(response.data.access))
  //     setAuthTokens(response.data);
  //     setUser(jwtDecode(response.data.access)); // Assuming your backend sends user data
  //     localStorage.setItem("authTokens", response.data);
  //   } catch (error) {

  //     // throw new Error(`Login failed: Invalid credentials`);
  //   }
  // };
  const loginUser = (email, password, from) => {
    axios
      .post(`users/token/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axios.defaults.headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        setAuthTokens(res.data.access);
        setUser(jwtDecode(res.data.access));
        setErr(null);
        navigate(from)
      })
      .catch((err) => {
        setErr(err.response.data);
        console.log(err.response.data);
      });
  };

  const logoutUser = () => {
    console.log('auth logout clicked')
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axios.defaults.headers['Authorization'] = null
        navigate("");
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    err,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
