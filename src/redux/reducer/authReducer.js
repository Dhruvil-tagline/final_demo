import { getCookie } from "../../utils/getCookie";

const token = getCookie("authToken");
const user = getCookie("authUser");
const initialState = {
  user: user || null,
  token: token || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    case "CHANGE_NAME":
      return { ...state, user: { ...state.user, name: action.payload } };
    default:
      return state;
  }
};

export default authReducer;
