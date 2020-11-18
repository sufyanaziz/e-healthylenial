import axios from "axios";

const instance = axios.create({
  baseURL: "https://app-healthylenial-api.herokuapp.com/healthylenial/api",
});

export default instance;
