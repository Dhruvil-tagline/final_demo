import { createBrowserRouter } from "react-router-dom";
import Protected from "../AuthComponent/Protected";
import AuthTeacher from "../AuthComponent/AuthTeacher";
import TeacherForm from "../TeacherCom/TeacherForm";
import AllStudent from "../TeacherCom/TeacherStudentCom/AllStudent";
import StudentDetails from "../TeacherCom/TeacherStudentCom/StudentDetails";
import ExamList from "../TeacherCom/ExamList";
import ExamDetail from "../TeacherCom/ExamDetail";
import EditProfile from "../StudentCom/EditProfile";
import AuthStudent from "../AuthComponent/AuthStudent";
import ResetPassword from "../ResetPassword";
import ExamForm from "../StudentCom/ExamForm";
import StudentResult from "../StudentCom/StudentResult";
import SignUp from "../AuthComponent/SignUp";
import Login from "../AuthComponent/Login";
import AuthGuard from "../AuthComponent/AuthGuard";
import ForgetPassword from "../AuthComponent/ForgetPassword";
import NewPassword from "../AuthComponent/NewPassword";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";





 const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><Home /></Protected>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'teacherForm',
                element: <AuthTeacher><TeacherForm /></AuthTeacher>
            },
            {
                path: 'student',
                element: <AuthTeacher><AllStudent /></AuthTeacher>,
            },
            {
                path: 'student/:id',
                element: <StudentDetails />,
            },
            {
                path: 'exams',
                element: <AuthTeacher> <ExamList /></AuthTeacher>,
            },
            {
                path: 'exam/create',
                element: <AuthTeacher><TeacherForm /></AuthTeacher>,
            },
            {
                path: 'exam/:id',
                element: <AuthTeacher> <ExamDetail /></AuthTeacher>,
            },
            {
                path: 'exam/edit/:id',
                element: <AuthTeacher><TeacherForm /></AuthTeacher>,
            },
            {
                path: 'profile',
                element: <Profile />,
                children: [
                    {
                        path: "editName",
                        element: <AuthStudent><EditProfile /></AuthStudent>
                    },
                    {
                        path: "resetPassword",
                        element: <ResetPassword />
                    }
                ]
            }, {
                path: 'examForm',
                element: <AuthStudent><ExamForm /></AuthStudent>,
            },
            {
                path: 'result',
                element: <AuthStudent><StudentResult /></AuthStudent>
            },
        ]
    },
    {
        path: '/signup',
        element: <AuthGuard><SignUp /></AuthGuard>,
    },
    {
        path: '/login',
        element: <AuthGuard><Login /></AuthGuard>
    },
    {
        path: '/forgetPassword',
        element: <AuthGuard><ForgetPassword /></AuthGuard>
    }, {
        path: '/newPassword',
        element: <AuthGuard><NewPassword /></AuthGuard>
    }
    , {
        path: '*',
        element: <PageNotFound />
    }
], {
    future: {
        v7_relativeSplatPath: true,
    },
})

export default router;