import axios from "axios";
const url = "http://localhost:5001/api";
export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/auth/register`, userData);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "REGISTER_FAIL", payload: err.response.data.message });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/auth/login`, userData);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL", payload: err.response.data.message });
  }
};

export const getUser = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get(`${url}/auth/me`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: "GET_USER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USER_FAIL", payload: err.response.data.message });
  }
};
