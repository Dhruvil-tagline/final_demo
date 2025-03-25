import { toast } from "react-toastify";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/api";

export const fetchExams = (token) => async (dispatch) => {
  dispatch({ type: "FETCH_EXAMS_REQUEST" });
  try {
    const response = await getRequest("dashboard/Teachers/viewExam", token);
    if (response?.statusCode === 200) {
      dispatch({ type: "FETCH_EXAMS_SUCCESS", payload: response.data });
    } else {
      dispatch({
        type: "FETCH_EXAMS_FAILURE",
        payload: response?.message || "Error occurred",
      });
    }
  } catch (error) {
    dispatch({
      type: "FETCH_EXAMS_FAILURE",
      payload: error.message || "Error occurred",
    });
  }
};

export const deleteExam = (id, token) => async (dispatch) => {
  dispatch({ type: "DELETE_EXAM_REQUEST" });
  try {
    const response = await deleteRequest(
      `dashboard/Teachers/deleteExam?id=${id}`,
      token,
    );
    if (response?.statusCode === 200) {
      dispatch({ type: "DELETE_EXAM_SUCCESS", payload: id });
      toast.success(response?.message);
    } else {
      dispatch({ type: "DELETE_EXAM_FAILURE", payload: response?.message });
      toast.error(response?.message || "Error occurred");
    }
  } catch (error) {
    dispatch({
      type: "DELETE_EXAM_FAILURE",
      payload: error.message || "Error occurred",
    });
  }
};

export const createExam = (examData, token, navigate) => async (dispatch) => {
  dispatch({ type: "CREATE_EXAM_REQUEST" });
  try {
    const response = await postRequest("dashboard/Teachers/Exam", examData, {
      "access-token": token,
    });
    if (response?.statusCode === 200) {
      dispatch({ type: "CREATE_EXAM_SUCCESS", payload: response.data });
      toast.success(response?.message);
      navigate(-1);
    } else {
      dispatch({ type: "CREATE_EXAM_FAILURE", payload: response.message });
      toast.error(response.message || "Error occurred");
    }
  } catch (error) {
    dispatch({ type: "CREATE_EXAM_FAILURE", payload: error.message });
  }
};

export const updateExam =
  (examData, id, token, navigate) => async (dispatch) => {
    dispatch({ type: "UPDATE_EXAM_REQUEST" });
    try {
      const response = await putRequest(
        `dashboard/Teachers/editExam?id=${id}`,
        examData,
        { "access-token": token },
      );
      if (response?.statusCode === 200) {
        dispatch({ type: "UPDATE_EXAM_SUCCESS", payload: response.data });
        toast.success(response?.message);
        navigate(-1);
      } else {
        dispatch({ type: "UPDATE_EXAM_FAILURE", payload: response.message });
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch({ type: "UPDATE_EXAM_FAILURE", payload: error.message });
    }
  };

export const fetchEditExamList = (id, token) => async (dispatch) => {
  dispatch({ type: "FETCH_EDIT_EXAMS_REQUEST" });
  try {
    const response = await getRequest(
      `dashboard/Teachers/examDetail?id=${id}`,
      token,
    );
    if (response?.statusCode === 200) {
      dispatch({
        type: "FETCH_EDIT_EXAMS_SUCCESS",
        payload: response?.data?.questions,
      });
    } else {
      dispatch({
        type: "FETCH_EDIT_EXAMS_FAILURE",
        payload: response?.message,
      });
    }
  } catch (error) {
    dispatch({ type: "FETCH_EDIT_EXAMS_FAILURE", payload: error.message });
  }
};
