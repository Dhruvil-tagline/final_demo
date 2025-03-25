import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCom from "../../shared/ButtonCom";
import ExamList from "./ExamList";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "0px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
          color: "rgb(18, 219, 206)",
          marginBottom: "20px",
          textShadow: "12px 12px  4px black",
        }}
      >
        <h1>Hello {user?.user?.name}</h1>
        <h1>Role: {user?.user?.role}</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <ButtonCom color="blue" onClick={() => navigate("/teacherForm")}>
          Create New Exam
        </ButtonCom>
      </div>
      <ExamList />
    </div>
  );
};

export default TeacherDashboard;
