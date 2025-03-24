import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCom from "../../CommonComponent/ButtonCom";
import Table from "../../CommonComponent/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditExamList } from "../../action/examActions";
const tableHeader = ['Index', 'Question', 'Answer', 'Action'];

const ExamDetail = () => {
    const {token} = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();
    const initialSubject = state?.subject || "";
    const initialNotes = state?.notes || ["", ""];
    const [examData, setExamData] = useState({
        subjectName: initialSubject,
        notes: initialNotes,
        questions: Array(15).fill().map(() => ({
            question: "",
            answer: "",
            options: ["", "", "", ""],
        })),
    });
    const [questions, setQuestions] = useState(Array(15).fill().map(() => ({ question: "", answer: "", options: ["", "", "", ""], })));

    const examListObj = useSelector((state) => state?.editExam);
    useEffect(() => {
        if (examListObj?.quesArray) {
            setExamData((prev) => ({
                ...prev,
                questions: examListObj?.quesArray,
            }));
            setQuestions(examListObj?.quesArray);
        }
    },[examListObj])
  

    const handleEdit = (index) => {
        navigate(`/exam/edit/${state.id}`, { state: { subject: initialSubject, notes: initialNotes, examId: state?.id, currentQ: index, questions: questions } })
    }

    useEffect(() => {
        dispatch(fetchEditExamList(state?.id, token));
    }, [])


    const tableData = useMemo(() => {
        return examData?.questions?.map((q, index) => ({
            Index: index + 1,
            Question: q?.question,
            Answer: q?.answer,
            Action: <ButtonCom text='Edit' onClick={() => handleEdit(index)} />,
        }))
    }, [examData]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0px 20px" }}>
            <div style={{ width: "100%", maxWidth: "900px" }}>
                <Table tableData={tableData} tableHeader={tableHeader} isLoading={examListObj.loading} />
            </div>  
        </div>
    );
};

export default ExamDetail;
