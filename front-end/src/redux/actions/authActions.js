import axios from "axios";
import { baseUrl } from "./movieActions";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + "/api/auth");
    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(baseUrl + "/api/signup", formData);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
    return res.json();
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(baseUrl + "/api/login", formData);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
