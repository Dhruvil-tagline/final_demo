import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRequest, postRequest } from '../../utils/api';
import ButtonCom from '../../shared/ButtonCom';
import RadioCom from '../../shared/RadioCom';
import Table from '../../shared/Table';
import { toast } from 'react-toastify';
import { examFormHeader } from '../../utils/staticObj';
import './studCss/student.css'
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';

const ExamForm = () => {
    const { state } = useLocation();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id, subjectName, notes } = state;
    const [exam, setExam] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [reviewMode, setReviewMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response = await getRequest(`student/examPaper?id=${id}`, token);
                if (response?.statusCode === 200) {
                    setExam(response?.data);
                    let temArray = !!response?.data.length && response?.data.map((val) => {
                        return { "question": val?._id, "answer": "" }
                    })
                    setSelectedAnswers(temArray);
                }
            } 
            finally {
                setLoading(false);
            }
        }
        fetchData()
    }, []);

    const handleAnswerSelect = (questionId, option) => {
        let x = selectedAnswers.map((val) => (val?.question === questionId) ? { "question": questionId, "answer": option } : val);
        setSelectedAnswers(x);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
    };
    const handleSubmitAndReview = () => {
        setReviewMode(true);
        setIsEditing(true);
    };
    const handleEditAnswer = (index) => {
        setCurrentQuestionIndex(index);
        setReviewMode(false);
    };
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await postRequest(`student/giveExam?id=${id}`, selectedAnswers, { 'access-token': token });
            if (response.statusCode === 200) {
                toast.success('Exam submitted successfully');
                navigate("/dashboard");
                setLoading(false);
            }
            else {
                toast.error(response?.message);
                setLoading(false);
            }
        } 
        finally {
            setLoading(false);
        }

    }
    const tableData = useMemo(() => {
        return exam.map((q, idx) => ({
            Index: idx + 1,
            Question: q.question,
            Answer: selectedAnswers[idx]?.answer,
            Action: <ButtonCom text="Edit Answer" onClick={() => handleEditAnswer(idx)} />
        }));
    }, [exam, selectedAnswers]);

    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', padding: "20px", }}>
            {loading && <Loader />}
            {
                !!exam.length ?
                    <div style={{ margin: "20px", padding: "15px", maxWidth: "900px", width: "100%", border: "1px solid gray", borderRadius: '10px' }}>
                        <h1 className='heading' style={{ marginBottom: "10px" }}>Examination 2025</h1>
                        <div>
                            <hr className='horizontalRule' />
                            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px", flexWrap: "wrap", gap: "15px" }}>
                                <p>Subject : {subjectName}</p>
                                <div>Notes:
                                    {!!notes?.length && notes.map((res, idx) => (
                                        <div key={idx}>
                                            <p>{res}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>

                                {!reviewMode ? (
                                    <div>
                                        <p style={{ margin: "10px 0px", fontSize: '20px' }}>Question {currentQuestionIndex + 1}: {exam[currentQuestionIndex]?.question}</p>
                                        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                                            {exam[currentQuestionIndex]?.options.map((opt, index) => {
                                                return (
                                                    <RadioCom
                                                        key={index}
                                                        text={opt}
                                                        value={opt}
                                                        name={`option-${currentQuestionIndex}`}
                                                        checked={selectedAnswers[currentQuestionIndex]?.answer === opt}
                                                        onChange={() => handleAnswerSelect(exam[currentQuestionIndex]?._id, opt)}
                                                    />
                                                )
                                            })}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0px", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
                                            <ButtonCom text="Previous" onClick={handlePrev} disabled={currentQuestionIndex === 0} />
                                            {(isEditing && currentQuestionIndex !== exam.length - 1) && <ButtonCom text="Submit and Review" onClick={handleSubmitAndReview} />}
                                            {currentQuestionIndex < exam.length - 1 ? (
                                                <ButtonCom text="Next" onClick={handleNext} />
                                            ) : (
                                                <ButtonCom text="Submit and Review" onClick={handleSubmitAndReview} />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                        <h2>Review Your Answers</h2>
                                        <div>
                                                <Table tableData={tableData} tableHeader={examFormHeader} dataNotFound={!exam.length} />
                                        </div>
                                        <ButtonCom text="Final Submit" onClick={handleSubmit} />
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    : <h1 style={{color:"red"}}> You are not applicable for the Exam </h1>
            }

        </div>
    );
}

export default ExamForm
