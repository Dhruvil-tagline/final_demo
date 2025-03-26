import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchEditExamList } from "../../action/examActions";
import ButtonCom from "../../shared/ButtonCom";
import Table from "../../shared/Table";
import { examDetailHeader } from "../../utils/staticObj";

const ExamDetail = () => {
  const { token } = useSelector((state) => state?.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialSubject = state?.subject || "";
  const initialNotes = state?.notes || ["", ""];
  const [examData, setExamData] = useState({
    subjectName: initialSubject,
    notes: initialNotes,
    questions: [],
  });
  const [questions, setQuestions] = useState([]);

  const examListObj = useSelector((state) => state?.editExam);
  useEffect(() => {
    if (examListObj?.quesArray.length) {
      setExamData({
        ...examData,
        questions: examListObj?.quesArray,
      });
      setQuestions(examListObj?.quesArray);
    }
  }, [examListObj]);

  const handleEdit = (index) => {
    navigate(`/updateExam/${id}`, {
      state: {
        subject: initialSubject,
        notes: initialNotes,
        examId: id,
        currentQ: index,
        questions: questions,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchEditExamList(id, token));
  }, [id, token]);

  const tableData = useMemo(() => {
    if (!examData?.questions.length) {
      return [];
    }
    return examData?.questions?.map((q, index) => ({
      Index: index + 1,
      Question: q?.question,
      Answer: q?.answer,
      Action: <ButtonCom onClick={() => handleEdit(index)}>Edit</ButtonCom>,
    }));
  }, [examData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <Table
          tableData={tableData}
          tableHeader={examDetailHeader}
          isLoading={examListObj.loading}
          minWidth={"500px"}
          error={examListObj.error}
        />
      </div>
    </div>
  );
};

export default ExamDetail;
