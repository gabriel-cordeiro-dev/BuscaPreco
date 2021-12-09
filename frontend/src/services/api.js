import axios from "axios";

const api = axios.create({
  baseURL: "https://listar-application.herokuapp.com/",
});

export default api;