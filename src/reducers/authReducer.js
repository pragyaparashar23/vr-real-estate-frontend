const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("isLogged"),
  loading: true,
  user: null,
  error: null,
  userDetails: JSON.parse(localStorage.getItem("userDetails")),
};

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      console.log("user details", payload.user);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("userDetails", JSON.stringify(payload.user));
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case "GET_USER_FAIL":
      return {
        ...state,
        user: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
