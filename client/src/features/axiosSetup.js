import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accepts: "application/json",
  },
});

export default customAxios;
