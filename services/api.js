import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    try {
      const tokenData = await AsyncStorage.getItem("@user_login_response");
      const token = tokenData ? JSON.parse(tokenData)?.accessToken : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error getting token for request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
