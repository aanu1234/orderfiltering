import * as api from "../api";
import { FETCH_ALL } from "./constants";

export const fetchOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getOrders();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const searchOrders = (formdata) => async (dispatch) => {
  try {
    const { data } = await api.postOrders(formdata);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
