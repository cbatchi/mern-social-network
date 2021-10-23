import axios from "axios";

export const [
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_BIO,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_USER_ERRORS,
] = [
  "GET_USER",
  "GET_USER_ERRORS",
  "UPLOAD_PICTURE",
  "UPDATE_BIO",
  "FOLLOW_USER",
  "UNFOLLOW_USER",
];

export const getUser = (uid) => (dispatch) =>
  axios
    .get(`/users/${uid}`)
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));


export const uploadPicture = (data, id) => (dispatch) =>
  axios
    .post("/users/upload", data)
    .then((res) => {
      if (res.data.errors) {
        dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
      } else {
        dispatch({ type: GET_USER_ERRORS, payload: "" });
        return axios.get(`/users/${id}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      }
    })
    .catch((err) => console.error(err));


export const updateBio = (id, bio) => (dispatch) =>
  axios
    .put(`/users/${id}`, { bio })
    .then((res) => {
      dispatch({ type: UPDATE_BIO, payload: bio });
    })
    .catch((err) => console.error(err));



export const followUser = (followerId, idToFollow) => (dispatch) =>
  axios
    .patch(`/users/follow/${followerId}`, { idToFollow })
    .then((res) => dispatch({ type: FOLLOW_USER, payload: idToFollow }))
    .catch((err) => console.error(err));


export const unfollowUser = (followerId, idToUnFollow) => (dispatch) =>
  axios
    .patch(`/users/unfollow/${followerId}`, { idToUnFollow })
    .then((res) => dispatch({ type: FOLLOW_USER, payload: idToUnFollow }))
    .catch((err) => console.error(err));

