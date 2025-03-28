import { combineReducers } from "redux";
import authReducer from "./authReducer";
import examReducer from "./examReducer";
import editExamReducer from "./editExamReducer";
import teacherStudentReducer from "./teacherStudentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  editExam: editExamReducer,
  teacherStudent: teacherStudentReducer,
});

export default rootReducer;
