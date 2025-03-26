import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createExam, updateExam } from "../../action/examActions";
import ButtonCom from "../../shared/ButtonCom";
import InputCom from "../../shared/InputCom";
import Loader from "../../shared/Loader";
import RadioCom from "../../shared/RadioCom";
import {
  questionsErrorObj,
  teacherErrorObj,
  TOTAL_QUESTIONS,
} from "../../utils/staticObj";
import validate from "../../utils/validate";

const TeacherForm = () => {
  const { token } = useSelector((state) => state.auth);
  const exams = useSelector((state) => state.exams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentQuestion, setCurrentQuestion] = useState(state?.currentQ || 0);
  const [allQuestionError, setAllQuestionError] = useState(
    Array(15).fill(false),
  );
  const [questionsError, setQuestionsError] = useState(questionsErrorObj);
  const [error, setError] = useState(teacherErrorObj);
  const [examData, setExamData] = useState({
    subjectName: state?.subject || "",
    questions:
      state?.questions ||
      Array(TOTAL_QUESTIONS)
        .fill()
        .map(() => ({
          question: "",
          answer: "",
          options: ["", "", "", ""],
        })),
    notes: state?.notes || ["", ""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormReset, setIsFormReset] = useState(false);

  const isDuplicateQuestion = (index, value) => {
    return examData.questions.some(
      (q, i) => i !== index && q?.question?.trim() === value?.trim(),
    );
  };

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const updatedQuestions = [...examData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [e.target.name]: value,
    };
    setExamData({ ...examData, questions: updatedQuestions });
    let error = null;
    if (!value.trim()) {
      error = "Question cannot be empty";
    } else if (isDuplicateQuestion(index, value)) {
      error = "Duplicate question not allowed";
    }
    setQuestionsError({ ...questionsError, questionError: error });
  };

  const handleQueValidate = (index) => {
    const errors = {};
    errors.optionsError = "";
    const updatedQuestions = [...examData.questions];
    const value = updatedQuestions[index];
    if (!value?.question.trim()) {
      errors.questionError = "Question cannot be empty";
    } else if (isDuplicateQuestion(index, value?.question)) {
      errors.questionError = "Duplicate question not allowed";
    } else {
      errors.questionError = "";
    }
    errors.answerError = validate("Answer", updatedQuestions[index]?.answer);
    if (questionsError.optionsError) {
      return false;
    }
    updatedQuestions[index]?.options.forEach((val) => {
      if (!val) {
        errors.optionsError = "4 option is required for each question";
      }
    });
    setQuestionsError(errors);
    return Object.values(errors).every((val) => !val);
  };

  const handleQuestionSave = (index, page) => {
    let allQue;
    if (handleQueValidate(index)) {
      allQue = allQuestionError.map((val, arrIndex) =>
        arrIndex === index ? true : val,
      );
      setAllQuestionError(allQue);
      page === "previous" && setCurrentQuestion(currentQuestion - 1);
      page === "next" && setCurrentQuestion(currentQuestion + 1);
    } else {
      allQue = allQuestionError.map((val, arrIndex) =>
        arrIndex === index ? false : val,
      );
      setAllQuestionError(allQue);
    }
    return allQue;
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    let uniqueOpt = updatedQuestions[qIndex].options.every(
      (val, index, arr) => {
        if (!val) {
          return true;
        }
        if (val) {
          return arr.every((val2, idx) => {
            if (idx == index) {
              return true;
            } else if (!val2) {
              return true;
            } else {
              return val2.trim() !== val.trim();
            }
          });
        }
      },
    );

    if (!uniqueOpt) {
      setQuestionsError({
        ...questionsError,
        optionsError: "Same option not allowed",
      });
    } else {
      setQuestionsError({ ...questionsError, optionsError: "" });
    }
    updatedQuestions[qIndex].answer = "";
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setExamData({ ...examData, subjectName: value });
    setError({ ...error, subjectError: validate("Subject name", value) });
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...examData.notes];
    updatedNotes[index] = value;
    let notesError = null;
    if (!updatedNotes.every((note) => note.trim() !== "")) {
      notesError = "Notes is required";
    } else if (updatedNotes[0].trim() === updatedNotes[1].trim()) {
      notesError = "Notes can not be same";
    }
    setError({ ...error, noteError: notesError });
    setExamData({ ...examData, notes: updatedNotes });
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[index].answer = value;
    setQuestionsError({
      ...questionsError,
      answerError: value ? "" : "Answer is required",
    });
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleValidate = useCallback(
    (result) => {
      const errors = { ...teacherErrorObj };
      errors.subjectError = validate("Subject name", examData.subjectName);
      if (!examData.notes.every((note) => note.trim() !== "")) {
        errors.noteError = "Notes are required";
      } else if (examData.notes[0].trim() === examData.notes[1].trim()) {
        errors.noteError = "Notes can not be same";
      }
      if (result) {
        !result.every((val) => val) &&
          (errors.queError = "Please fill out all the question");
      }
      setError(errors);
      return Object.values(errors).every((val) => !val);
    },
    [examData],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = handleQuestionSave(currentQuestion);
    if (!handleValidate(result)) return;
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setExamData({
      subjectName: "",
      questions: Array(TOTAL_QUESTIONS)
        .fill()
        .map(() => ({
          question: "",
          answer: "",
          options: ["", "", "", ""],
        })),
      notes: ["", ""],
    });
    setQuestionsError(questionsErrorObj);
    setAllQuestionError(Array(TOTAL_QUESTIONS).fill(false));
    setError(teacherErrorObj);
    setIsFormReset(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (state?.examId) {
        dispatch(updateExam(examData, state?.examId, token, navigate));
      } else {
        dispatch(createExam(examData, token, navigate));
      }
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isFormReset) {
      setCurrentQuestion(0);
      setIsFormReset(false);
    }
  }, [isFormReset]);

  useEffect(() => {
    if (state?.questions) {
      setAllQuestionError(Array(15).fill(true));
    }
  }, [state?.questions]);
  return (
    <div>
      <div style={{ paddingTop: "20px" }}>
        {exams?.loading && <Loader />}
        <h1 style={{ textAlign: "center", color: "rgb(18, 219, 206)" }}>
          {state?.examId ? "Edit Exam" : "Create Exam"}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            padding: "20px",
            flexWrap: "wrap",
          }}
        >
          <form
            onSubmit={handleSubmit}
            onReset={resetForm}
            style={{ maxWidth: "1100px" }}
          >
            <label htmlFor="subjectName" style={{ fontSize: "20px" }}>
              Subject Name
            </label>
            {error?.subjectError && (
              <span style={{ color: "red" }}>{error.subjectError}</span>
            )}
            <InputCom
              type="text"
              name="subjectName"
              id="subjectName"
              value={examData.subjectName}
              onChange={handleSubjectChange}
              placeholder="Subject Name"
            />
            <label
              style={{
                display: "inline-block",
                margin: "20px 0px",
                fontSize: "20px",
              }}
            >
              Question
            </label>
            {error?.queError && (
              <span style={{ color: "red" }}>{error.queError}</span>
            )}
            <div>
              <div
                style={{
                  border: "1px solid gray",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <label htmlFor="question">
                    Question {currentQuestion + 1}
                  </label>
                  {questionsError?.questionError && (
                    <span style={{ color: "red" }}>
                      {questionsError.questionError}
                    </span>
                  )}
                  <InputCom
                    name="question"
                    type="text"
                    placeholder="Enter question"
                    id="question"
                    value={examData?.questions[currentQuestion]?.question}
                    onChange={(e) => handleInputChange(currentQuestion, e)}
                  />
                </div>
                {questionsError?.optionsError && (
                  <span style={{ color: "red" }}>
                    {questionsError.optionsError}
                  </span>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 0px",
                    flexWrap: "wrap",
                  }}
                >
                  {examData?.questions[currentQuestion]?.options &&
                    examData?.questions[currentQuestion]?.options.map(
                      (opt, idx) => (
                        <div key={idx}>
                          <InputCom
                            type="text"
                            placeholder={`Option ${idx + 1}`}
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(
                                currentQuestion,
                                idx,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      ),
                    )}
                </div>
                <div style={{ padding: "20px 0px" }}>
                  <label>
                    Select Correct Answer:
                    {examData?.questions[currentQuestion]?.answer}
                  </label>
                  {questionsError?.answerError && (
                    <span style={{ color: "red" }}>
                      {questionsError?.answerError}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {examData?.questions[currentQuestion]?.options &&
                    examData?.questions[currentQuestion]?.options.map(
                      (opt, idx) => {
                        if (!opt) return;
                        return (
                          <div
                            key={idx}
                            style={{ display: "flex", flexWrap: "wrap" }}
                          >
                            <RadioCom
                              name={`answer-${currentQuestion}`}
                              value={opt}
                              checked={
                                examData.questions[currentQuestion].answer ===
                                opt
                              }
                              onChange={(e) =>
                                handleAnswerChange(
                                  currentQuestion,
                                  e.target.value,
                                )
                              }
                              text={opt}
                            />
                          </div>
                        );
                      },
                    )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <ButtonCom
                  type="button"
                  disabled={currentQuestion === 0}
                  onClick={() => {
                    handleQuestionSave(currentQuestion, "previous");
                  }}
                >
                  Previous
                </ButtonCom>

                <ButtonCom
                  type="button"
                  disabled={currentQuestion === TOTAL_QUESTIONS - 1}
                  onClick={() => {
                    handleQuestionSave(currentQuestion, "next");
                  }}
                >
                  Next
                </ButtonCom>
              </div>
            </div>
            <label style={{ fontSize: "20px" }}>Notes</label>
            {error?.noteError && (
              <span style={{ color: "red" }}>{error.noteError}</span>
            )}
            {examData.notes.map((note, index) => (
              <InputCom
                key={index}
                type="text"
                placeholder={`Note ${index + 1}`}
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <ButtonCom
                color="blue"
                type="reset"
                style={{ backgroundColor: "gray" }}
              >
                Cancel
              </ButtonCom>

              <ButtonCom type="submit" color="green">
                {state?.examId ? "Update" : "Submit"}
              </ButtonCom>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
