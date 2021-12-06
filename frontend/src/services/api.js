import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-listar.herokuapp.com/",
});

export default api;