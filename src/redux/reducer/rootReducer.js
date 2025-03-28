import { combineReducers } from "redux";
import editExamReducer from "./editExamReducer";
import examReducer from "./examReducer";
import teacherStudentReducer from "./teacherStudentReducer";

const rootReducer = combineReducers({
  exams: examReducer,
  editExam: editExamReducer,
  teacherStudent: teacherStudentReducer,
});

export default rootReducer;
