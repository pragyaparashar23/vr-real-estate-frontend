const initialState = {
    properties: [],
    property: null,
    loading: true,
    error: null,
  };
  
  export default function PropertyReducers(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case 'GET_PROPERTIES_SUCCESS':
        return {
          ...state,
          properties: payload,
          loading: false,
          error: null,
        };
      case 'GET_PROPERTY_SUCCESS':
        return {
          ...state,
          property: payload,
          loading: false,
          error: null,
        };
      case 'CREATE_PROPERTY_SUCCESS':
        return {
          ...state,
          properties: [...state.properties, payload],
          loading: false,
          error: null,
        };
      case 'UPDATE_PROPERTY_SUCCESS':
        return {
          ...state,
          properties: state.properties.map((property) =>
            property._id === payload._id ? payload : property
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_PROPERTY_SUCCESS':
        return {
          ...state,
          properties: state.properties.filter((property) => property._id !== payload),
          loading: false,
          error: null,
        };
      case 'GET_PROPERTIES_FAIL':
      case 'GET_PROPERTY_FAIL':
      case 'CREATE_PROPERTY_FAIL':
      case 'UPDATE_PROPERTY_FAIL':
      case 'DELETE_PROPERTY_FAIL':
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  }
  