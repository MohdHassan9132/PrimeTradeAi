import axios from 'axios';




const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    const status = err.response?.status;

    // Don't retry login
    if (originalRequest.url.includes("/user/login")) {
      return Promise.reject(err);
    }

    // ONLY refresh if access token expired
    if (status === 498 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await api.post("/user/refreshAccessToken", {}, { withCredentials: true });
        isRefreshing = false;
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;

