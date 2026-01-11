import axios from "axios";
import { getToken, setToken, removeToken } from "@/utils/token";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// ====================
// REFRESH TOKEN QUEUE
// ====================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ====================
// REQUEST INTERCEPTOR
// ====================
httpRequest.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ====================
// RESPONSE INTERCEPTOR
// ====================
httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // access token hết hạn (401) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      const { refreshToken } = getToken();

      if (!refreshToken) {
        removeToken();
        history.push("/login");
        return Promise.reject(error);
      }

      // ====================
      // ĐANG REFRESH TOKEN
      // ====================
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpRequest(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          {
            refresh_token: refreshToken,
          }
        );

        const { access_token, refresh_token } = response.data;

        setToken({
          accessToken: access_token,
          refreshToken: refresh_token,
        });

        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return httpRequest(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeToken();
        history.push("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        failedQueue = []; // 🔥 xóa queue sau khi refresh xong
      }
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
