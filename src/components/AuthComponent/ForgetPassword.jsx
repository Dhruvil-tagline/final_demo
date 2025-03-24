import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import './AuthCss/SignUp.css'
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { postRequest } from '../../utils/api';
import Loader from '../../CommonComponent/Loader';

const ForgetPassword = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setError(validateEmail(value));
    };
    const searchUser = async () => {
        try {
            setLoading(true);
            let response = await postRequest('users/ForgotPassword', { email: search })
            if (response.statusCode === 200) {
                toast.success(response?.message);
                navigate('/login');
            }
            else {
                toast.error(response?.message);
            }
        } 
        finally {
            setLoading(false);
        }
    }
    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        let emailValidate = validateEmail(search);
        if (emailValidate) {
            setError(emailValidate);
        } else {
            searchUser();
        }
    }

    return (
        <div className='authContainer'>
            {loading && <Loader />}
            <div className='authInnerDiv'>
                <form onSubmit={handleSubmit} onReset={() => { setSearch(''); setError('') }} className='form'>
                    <h1 className='authHeading'>Find Your Account</h1> <br />
                    <p>Please enter your email address  to search for your account.</p>
                    <InputCom type='email' name='search' value={search} onChange={handleChange} />
                    <span className='error'>{error}</span>
                    <div style={{ display: 'flex', gap: '20px', marginTop: "20px" }}>
                        <ButtonCom text='Search' />
                        <ButtonCom onClick={() => navigate(-1)} text='Back' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
