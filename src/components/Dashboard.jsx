import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/getCookie";
import TeacherDashboard from "./TeacherCom/TeacherDashboard";
import StudentDashboard from "./StudentCom/StudentDashboard";

const Dashboard = () => {
        const user = getCookie('authUser');
    if (user?.role === "teacher") {
        return <TeacherDashboard/>;
    } else if (user?.role === "student") {
        return <StudentDashboard />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default Dashboard;
