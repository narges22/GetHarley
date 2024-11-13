import axios from "axios";
import { apiURL } from "./consts";

export const getProducts = () => {
  return axios.get(`${apiURL}/products`).then((res) => res.data);
};

export const getCategories = () => {
  return axios.get(`${apiURL}/categories`).then((res) => res.data);
};
