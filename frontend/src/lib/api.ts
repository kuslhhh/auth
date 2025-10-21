import axios from "axios";

export const api = axios.create({
   baseURL: "http://localhost:5000/api",
   withCredentials: true
})

api.interceptors.response.use(
   res => res,
   async err => {
      const originalRequest = err.config;
      if (err.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const { data } = await api.post("/auth/refresh");
            const newToken = data.accessToken;
            localStorage.setItem("accessToken", newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
         } catch (_err) {
            localStorage.removeItem("accessToken");
            return Promise.reject(_err);
         }
      }
      return Promise.reject(err);
   }
);