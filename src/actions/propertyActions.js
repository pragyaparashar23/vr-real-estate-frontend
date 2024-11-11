import axios from "axios";
import { baseUrl } from "../config";

export const getProperties = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/properties/propertyList`);
    dispatch({ type: "GET_PROPERTIES_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "GET_PROPERTIES_FAIL",
      payload: err.response?.data?.message,
    });
  }
};

export const getProperty = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/properties/${id}`);
    dispatch({ type: "GET_PROPERTY_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "GET_PROPERTY_FAIL",
      payload: err.response?.data?.message,
    });
  }
};

export const createProperty = (propertyData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.post(
      `${baseUrl}/properties/create/property`,
      propertyData,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    dispatch({ type: "CREATE_PROPERTY_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "CREATE_PROPERTY_FAIL",
      payload: err.response?.data?.message,
    });
  }
};

export const updateProperty =
  (id, propertyData) => async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const res = await axios.put(
        `${baseUrl}/properties/update/property/${id}`,
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch({ type: "UPDATE_PROPERTY_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({
        type: "UPDATE_PROPERTY_FAIL",
        payload: err.response?.data?.message,
      });
    }
  };

export const deleteProperty = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    await axios.delete(`/api/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: "DELETE_PROPERTY_SUCCESS", payload: id });
  } catch (err) {
    dispatch({
      type: "DELETE_PROPERTY_FAIL",
      payload: err.response?.data?.message,
    });
  }
};
