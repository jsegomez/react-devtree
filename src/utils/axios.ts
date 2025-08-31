import axios from "axios";
import { envConfig } from "../config/env";

const api = axios.create({
  baseURL: envConfig.apiUrl,
});

export default api;