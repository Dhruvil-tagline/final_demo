import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCom from "../../shared/ButtonCom";
import Loader from "../../shared/Loader";
import RadioCom from "../../shared/RadioCom";
import Table from "../../shared/Table";
import { getRequest, postRequest } from "../../utils/api";
import { examFormHeader } from "../../utils/staticObj";
import "./studCss/student.css";

const ExamForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [exam, setExam] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id, subjectName, notes } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let response = await getRequest(`student/examPaper?id=${id}`, token);
        if (response?.statusCode === 200) {
          setExam(response?.data);
          let temArray =
            !!response?.data.length &&
            response?.data.map((val) => {
              return { question: val?._id, answer: "" };
            });
          setSelectedAnswers(temArray);
        } else {
          setError(response?.message || "Error occurred");
        }
      } catch (error) {
        setError(error?.message || "Error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleAnswerSelect = (questionId, option) => {
    let x = selectedAnswers.map((val) =>
      val?.question === questionId
        ? { question: questionId, answer: option }
        : val,
    );
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
      const response = await postRequest(
        `student/giveExam?id=${id}`,
        selectedAnswers,
        { "access-token": token },
      );
      if (response.statusCode === 200) {
        toast.success("Exam submitted successfully");
        navigate("/dashboard");
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const tableData = useMemo(() => {
    return exam.map((q, idx) => ({
      Index: idx + 1,
      Question: q.question,
      Answer: selectedAnswers[idx]?.answer,
      Action: (
        <ButtonCom onClick={() => handleEditAnswer(idx)}>Edit Answer</ButtonCom>
      ),
    }));
  }, [exam, selectedAnswers]);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          padding: "20px",
        }}
      >
        <p className="no-data">
          {" "}
          {error || "Error occurred please refresh the page"}
        </p>
        <ButtonCom onClick={() => window.location.reload(false)}>
          Refresh
        </ButtonCom>
        <ButtonCom onClick={() => navigate(-1)}>Back</ButtonCom>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {loading && <Loader />}
      <div
        style={{
          margin: "20px",
          padding: "15px",
          maxWidth: "900px",
          width: "100%",
          border: "1px solid gray",
          borderRadius: "10px",
        }}
      >
        <h1 className="heading" style={{ marginBottom: "10px" }}>
          Examination 2025
        </h1>
        <div>
          <hr className="horizontalRule" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <p>Subject : {subjectName}</p>
            <div>
              Notes:
              {!!notes?.length &&
                notes.map((res, idx) => (
                  <div key={idx}>
                    <p>{res}</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            {!reviewMode ? (
              <div>
                <p style={{ margin: "10px 0px", fontSize: "20px" }}>
                  Question {currentQuestionIndex + 1}:
                  {exam[currentQuestionIndex]?.question}
                </p>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  {exam[currentQuestionIndex]?.options.map((opt, index) => {
                    return (
                      <RadioCom
                        key={index}
                        text={opt}
                        value={opt}
                        name={`option-${currentQuestionIndex}`}
                        checked={
                          selectedAnswers[currentQuestionIndex]?.answer === opt
                        }
                        onChange={() =>
                          handleAnswerSelect(
                            exam[currentQuestionIndex]?._id,
                            opt,
                          )
                        }
                      />
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 0px",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <ButtonCom
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </ButtonCom>
                  {isEditing && currentQuestionIndex !== exam.length - 1 && (
                    <ButtonCom onClick={handleSubmitAndReview}>
                      Submit and Review
                    </ButtonCom>
                  )}
                  {currentQuestionIndex < exam.length - 1 ? (
                    <ButtonCom onClick={handleNext}>Next</ButtonCom>
                  ) : (
                    <ButtonCom onClick={handleSubmitAndReview}>
                      Submit and Review
                    </ButtonCom>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h2>Review Your Answers</h2>
                <div>
                  <Table
                    tableData={tableData}
                    tableHeader={examFormHeader}
                    dataNotFound={!exam.length}
                  />
                </div>
                <ButtonCom onClick={handleSubmit}>Final Submit</ButtonCom>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
