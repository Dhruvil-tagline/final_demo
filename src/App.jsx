import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import SignUp from './components/AuthComponent/SignUp';
import Protected from './components/AuthComponent/Protected';
import ForgetPassword from './components/AuthComponent/ForgetPassword';
import NewPassword from './components/AuthComponent/NewPassword';
import Login from './components/AuthComponent/Login';
import StudentDetails from './components/TeacherCom/TeacherStudentCom/StudentDetails';
import ExamList from './components/TeacherCom/ExamList';
import TeacherForm from './components/TeacherCom/TeacherForm';
import ExamDetail from './components/TeacherCom/ExamDetail';
import ExamForm from './components/StudentCom/ExamForm';
import StudentResult from './components/StudentCom/StudentResult';
import AllStudent from './components/TeacherCom/TeacherStudentCom/AllStudent';
import EditProfile from './components/StudentCom/EditProfile';
import ResetPassword from './components/ResetPassword';
import AuthGuard from './components/AuthComponent/AuthGuard';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AuthTeacher from './components/AuthComponent/AuthTeacher';
import AuthStudent from './components/AuthComponent/AuthStudent';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard/>,
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

function App() {
  return (
    <>
      <div className='rootContainer'>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
