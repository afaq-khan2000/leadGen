import axios from "axios";
// import { toast } from "react-hot-toast";

const instance = axios.create({
  // baseURL: 'http://51.21.88.37:8001',
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    // "content-type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    // config.headers.authorization = `Bearer ${accessToken}` ?? ""
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     const { data } = response;
//     if (data.notify) {
//       const customId = data.message ?? "success";
//       toast.success(data.message ?? "success", { toastId: convertHtmlToText(customId) });
//     }
//     return response;
//   },
//   (error) => {
//     const { response } = error;

//     if (response.data.notify === true && response.status === 401) {
//       toast.error(`(401) ${response?.data?.message}`);
//     }

//     if (response.data.notify === true && response.status !== 401) {
//       toast.error(response?.data?.message);
//     }

//     if (response.status === 401 || response.status === 403) {
//       let user = localStorage.getItem("user");
//       if (user) {
//         localStorage.clear();
//         const httpMethod = import.meta.env.VITE_HTTP;
//         const origin = import.meta.env.VITE_MAIN_ORIGIN;
//         const newOrigin = `${httpMethod}://${origin}`;
//         setTimeout(() => {
//           window.location.href = newOrigin;
//         }, 1500);
//       }
//     }
//     return error;
//   }
// );

export default instance;
