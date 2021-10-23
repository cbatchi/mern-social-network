import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => (dispatch) =>
  axios
    .get("/users")
    .then((res) => {
      dispatch({ type: GET_USERS, payload: res.data });
    })
    .catch((err) => console.error(err));
