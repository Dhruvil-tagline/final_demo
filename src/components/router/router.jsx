import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../AuthComponent/AuthGuard";
import AuthStudent from "../AuthComponent/AuthStudent";
import AuthTeacher from "../AuthComponent/AuthTeacher";
import ForgetPassword from "../AuthComponent/ForgetPassword";
import Login from "../AuthComponent/Login";
import NewPassword from "../AuthComponent/NewPassword";
import Protected from "../AuthComponent/Protected";
import SignUp from "../AuthComponent/SignUp";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import ResetPassword from "../ResetPassword";
import EditProfile from "../StudentCom/EditProfile";
import ExamForm from "../StudentCom/ExamForm";
import StudentResult from "../StudentCom/StudentResult";
import ExamDetail from "../TeacherCom/ExamDetail";
import ExamList from "../TeacherCom/ExamList";
import TeacherForm from "../TeacherCom/TeacherForm";
import AllStudent from "../TeacherCom/TeacherStudentCom/AllStudent";
import StudentDetails from "../TeacherCom/TeacherStudentCom/StudentDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "teacherForm",
          element: (
            <AuthTeacher>
              <TeacherForm />
            </AuthTeacher>
          ),
        },
        {
          path: "students",
          element: (
            <AuthTeacher>
              <AllStudent />
            </AuthTeacher>
          ),
        },
        {
          path: "student/:id",
          element: <StudentDetails />,
        },
        {
          path: "exams",
          element: (
            <AuthTeacher>
              <ExamList />
            </AuthTeacher>
          ),
        },
        // {
        //   path: "exam/create",
        //   element: (
        //     <AuthTeacher>
        //       <TeacherForm />
        //     </AuthTeacher>
        //   ),
        // },
        {
          path: "exam/:id",
          element: (
            <AuthTeacher>
              <ExamDetail />
            </AuthTeacher>
          ),
        },
        {
          path: "updateExam/:id",
          element: (
            <AuthTeacher>
              <TeacherForm />
            </AuthTeacher>
          ),
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "editName",
              element: (
                <AuthStudent>
                  <EditProfile />
                </AuthStudent>
              ),
            },
            {
              path: "resetPassword",
              element: <ResetPassword />,
            },
          ],
        },
        {
          path: "examForm",
          element: (
            <AuthStudent>
              <ExamForm />
            </AuthStudent>
          ),
        },
        {
          path: "result",
          element: (
            <AuthStudent>
              <StudentResult />
            </AuthStudent>
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: (
        <AuthGuard>
          <SignUp />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthGuard>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/forgetPassword",
      element: (
        <AuthGuard>
          <ForgetPassword />
        </AuthGuard>
      ),
    },
    {
      path: "/newPassword",
      element: (
        <AuthGuard>
          <NewPassword />
        </AuthGuard>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export default router;
