import { orderPayload } from "@/context/basket/type";
import axios from "axios";
import { apiURL } from "./consts";

export type addOrderPayload = {
  products: orderPayload[];
};

export const addNewOrder = (order: addOrderPayload) => {
  return axios.post(`${apiURL}/orders`, order).then((res) => res.data);
};

export const editExistingOrder = () => {};

export const getOrderbyId = (id: number) => {
  return axios.get(`${apiURL}/orders/${id}`).then((res) => res.data);
};

export const purchaseOrder = (id: number) => {
  return axios.post(`${apiURL}/orders/${id}/buy`).then((res) => res.data);
};
