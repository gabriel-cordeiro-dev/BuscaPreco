import axios from "axios";

const api = axios.create({
  baseURL: "https://listarapplication.herokuapp.com/",
});

export default api;