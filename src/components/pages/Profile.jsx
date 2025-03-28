import { getCookie } from "../../utils/getCookie";
import ResetPassword from "../auth/ResetPassword";
import StudentProfile from '../Student/StudentProfile'

const Profile = () => {
  const user = getCookie("authUser");
  return user?.role === "teacher" ? <ResetPassword /> : <StudentProfile />;
};

export default Profile;
