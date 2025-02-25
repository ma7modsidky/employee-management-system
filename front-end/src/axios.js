import axios from "axios";

const baseURL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const response = await axios.post(`${baseURL}token/refresh/`, {
          refresh: authTokens.refresh,
        });

        localStorage.setItem(
          "authTokens",
          JSON.stringify({
            ...authTokens,
            access: response.data.access,
          })
        );

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        localStorage.removeItem("authTokens");
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;