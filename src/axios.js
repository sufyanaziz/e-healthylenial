import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/healthylenial/api",
});

export default instance;
