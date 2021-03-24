import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accepts: "application/json",
  },
});

export default customAxios;
