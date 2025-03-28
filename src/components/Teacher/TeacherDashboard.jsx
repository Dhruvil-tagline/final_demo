import { useNavigate } from "react-router-dom";
import ButtonCom from "../../shared/ButtonCom";
import ExamList from "./ExamList";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "0px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
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
