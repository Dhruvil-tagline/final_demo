import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../AuthComponent/AuthGuard";
import AuthStudent from "../AuthComponent/AuthStudent";
import AuthTeacher from "../AuthComponent/AuthTeacher";
import Protected from "../AuthComponent/Protected";
import PageNotFound from "../pages/PageNotFound";
const Login = lazy(() => import("../AuthComponent/Login"));
const NewPassword = lazy(() => import("../AuthComponent/NewPassword"));
const SignUp = lazy(() => import("../AuthComponent/SignUp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const ResetPassword = lazy(() => import("../ResetPassword"));
const EditProfile = lazy(() => import("../StudentCom/EditProfile"));
const ExamForm = lazy(() => import("../StudentCom/ExamForm"));
const StudentResult = lazy(() => import("../StudentCom/StudentResult"));
const ExamDetail = lazy(() => import("../TeacherCom/ExamDetail"));
const ExamList = lazy(() => import("../TeacherCom/ExamList"));
const TeacherForm = lazy(() => import("../TeacherCom/TeacherForm"));
const AllStudent = lazy(
  () => import("../TeacherCom/TeacherStudentCom/AllStudent"),
);
const StudentDetails = lazy(
  () => import("../TeacherCom/TeacherStudentCom/StudentDetails"),
);
const ForgetPassword = lazy(() => import("../AuthComponent/ForgetPassword"));

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
