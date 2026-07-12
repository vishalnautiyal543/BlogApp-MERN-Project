import axios from "axios";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/tokenManager";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

    async (error) => {

    const originalRequest = error.config;

    // refresh API ko dobara intercept mat karo
    if (originalRequest.url === "/refresh-token" ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const response = await axios.post(
          "http://localhost:8000/api/v1/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newToken = response.data.accessToken;

        setAccessToken(newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return axiosInstance(originalRequest);

      } catch (err) {

        removeAccessToken();

        return Promise.reject(err);

      }

    }

    return Promise.reject(error);

  },
);

export { axiosInstance };
