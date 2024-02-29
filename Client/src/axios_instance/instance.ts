import axios from "axios";
import jsCookie from "js-cookie";
const accessToken = jsCookie.get("user_accessToken");
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  // withCredentials: true,
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default instance;
