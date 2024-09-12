import axios from 'axios';

export const scheduleTour = (tourData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.post('/api/tours', tourData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: 'SCHEDULE_TOUR_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SCHEDULE_TOUR_FAIL', payload: err.response.data.message });
  }
};

export const getTours = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get('/api/tours', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: 'GET_TOURS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_TOURS_FAIL', payload: err.response.data.message });
  }
};

export const getTour = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.get(`/api/tours/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: 'GET_TOUR_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_TOUR_FAIL', payload: err.response.data.message });
  }
};

export const updateTour = (id, tourData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const res = await axios.put(`/api/tours/${id}`, tourData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: 'UPDATE_TOUR_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'UPDATE_TOUR_FAIL', payload: err.response.data.message });
  }
};

export const deleteTour = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    await axios.delete(`/api/tours/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch({ type: 'DELETE_TOUR_SUCCESS', payload: id });
  } catch (err) {
    dispatch({ type: 'DELETE_TOUR_FAIL', payload: err.response.data.message });
  }
};
