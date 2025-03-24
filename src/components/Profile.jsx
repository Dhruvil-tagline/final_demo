import { getCookie } from '../utils/getCookie';
import ResetPassword from './ResetPassword';
import StudentProfile from './StudentCom/StudentProfile';

const Profile = () => {
    const user = getCookie('authUser');
    return user?.role === 'teacher' ? <ResetPassword /> : <StudentProfile />
}

export default Profile
