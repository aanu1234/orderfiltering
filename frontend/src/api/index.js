import axios from "axios";
// config
import { HOST_API_KEY } from "../config.js";

// axios instance
const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

// ------------------------------------------------------------------------------

// ------------------------ Orders Request Routes ---------------------
export const getOrders = async (requestBody) =>
  axiosInstance.get(`/orders`, requestBody);

export const postOrders = async (requestBody) =>
  axiosInstance.post(`/orders`, requestBody);
// ------------------------------------------------------------------------------

export default axiosInstance;
