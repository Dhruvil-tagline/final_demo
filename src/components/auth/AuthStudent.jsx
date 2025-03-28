import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";

const AuthStudent = ({ children }) => {
  const user = getCookie("authUser");
  return user?.role === "student" ? children : <Navigate to="/dashboard" />;
};

export default AuthStudent;
