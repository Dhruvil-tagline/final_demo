import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";

const AuthTeacher = ({ children }) => {
  const user = getCookie("authUser");
  return user?.role === "teacher" ? children : <Navigate to="/dashboard" />;
};

export default AuthTeacher;
