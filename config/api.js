import axios from "axios";

export const PROD_URL = "https://brgyugongpasigcity.com/api/";

export const api = axios.create({
  baseURL: PROD_URL,
});
