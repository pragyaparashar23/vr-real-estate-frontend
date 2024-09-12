const initialState = {
    tours: [],
    tour: null,
    loading: true,
    error: null,
  };
  
  export default function TourReducers(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'GET_TOURS_SUCCESS':
        return {
          ...state,
          tours: payload,
          loading: false,
          error: null,
        };
      case 'GET_TOUR_SUCCESS':
        return {
          ...state,
          tour: payload,
          loading: false,
          error: null,
        };
      case 'SCHEDULE_TOUR_SUCCESS':
        return {
          ...state,
          tours: [...state.tours, payload],
          loading: false,
          error: null,
        };
      case 'UPDATE_TOUR_SUCCESS':
        return {
          ...state,
          tours: state.tours.map((tour) =>
            tour._id === payload._id ? payload : tour
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_TOUR_SUCCESS':
        return {
          ...state,
          tours: state.tours.filter((tour) => tour._id !== payload),
          loading: false,
          error: null,
        };
      case 'GET_TOURS_FAIL':
      case 'GET_TOUR_FAIL':
      case 'SCHEDULE_TOUR_FAIL':
      case 'UPDATE_TOUR_FAIL':
      case 'DELETE_TOUR_FAIL':
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  }
  