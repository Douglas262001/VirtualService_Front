import axios from "axios";

const api = axios.create({
  baseURL: "https://yellowsoftware.azurewebsites.net/api",
});

api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default api;