import axios from "axios";
export const baseUrl = "http://localhost:5000";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const getMovies = () => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + "/api/movies");
    dispatch({
      type: "GET_MOVIES",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addMovie = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(baseUrl + "/api/movies", formData);
    dispatch({
      type: "ADD_MOVIE",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateMovie = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(baseUrl + `/api/movies/${id}`, formData);
    dispatch({
      type: "UPDATE_MOVIE",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(baseUrl + `/api/movies/${id}`);
    dispatch({
      type: "DELETE_MOVIE",
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};
