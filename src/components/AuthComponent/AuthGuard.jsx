import { getCookie } from "../../utils/getCookie";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = getCookie("authToken");
  return token ? <Navigate to="/dashboard" /> : children;
};

export default AuthGuard;
