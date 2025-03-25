import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AuthCss/SignUp.css'
import { getRequest, postRequest } from '../../utils/api';
import { validateEmpty, validatePassword } from '../../utils/validation';
import InputCom from '../../sharedComponent/InputCom';
import ButtonCom from '../../sharedComponent/ButtonCom';
import Loader from '../../sharedComponent/Loader';

const NewPassword = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        Password: '',
        ConfirmPassword: ''
    })
    const [errors, setErrors] = useState({});
    const [searchParams] = useSearchParams();
    let token = searchParams.get('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response = await getRequest('users/newPassword', token);
                if (response) {
                    console.log(response)
                }
                if (response.statusCode !== 200) {
                    toast.error(response?.message);
                    setData({ Password: '', ConfirmPassword: ''});
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    },[])
    const fetchData = async () => {
        try {
            setLoading(true);
            let response = await postRequest(`users/ForgotPassword/Verify?token=${token}`, data)
            if (response.statusCode === 200) {
                toast.success(response?.message);
            }
            else {
                toast.error(response?.message)
            }
        } 
        finally {
            setLoading(false);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordValidation = validatePassword(data.Password, data.ConfirmPassword);
        if (passwordValidation) {
            return;
        } else {
            fetchData();
        }
    }
    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, passwordError: validatePassword(e.target.value, data.ConfirmPassword) }));
    }
    const handleChangeConfirmPassword = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ passwordError: validatePassword(data.Password, e.target.value), confirmPasswordError: validateEmpty(e.target.value, 'confirmPassword') }));
    };
    return (
        <div className='authContainer'>
            {loading && <Loader />}
            <div className='authInnerDiv'>
                <form onSubmit={handleSubmit} className='form' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <h1 className='authHeading'>Reset  password</h1>
                    <InputCom type='password' placeholder='New password...' name='Password' value={data.Password} onChange={handleChangePassword} />
                    <span className="error">{errors.passwordError}</span>
                    <InputCom type='password' placeholder='Confirm password...' name='ConfirmPassword' value={data.ConfirmPassword} onChange={handleChangeConfirmPassword} />
                    <span className="error">{errors.confirmPasswordError}</span>
                    <div>
                        <ButtonCom text='Submit' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewPassword
