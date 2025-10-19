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
            const { data } = await axios.post(
               "http://localhost:5000/api/auth/refresh",
               {},
               { withCredentials: true }
            );
            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
            return axios(originalRequest);
         } catch (_err) {
            return Promise.reject(_err);
         }
      }
      return Promise.reject(err);
   }
);