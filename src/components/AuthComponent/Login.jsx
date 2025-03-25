import { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import './AuthCss/SignUp.css'
import { validateEmail, validatePassword } from '../../utils/validation';
import InputCom from '../../sharedComponent/InputCom';
import ButtonCom from '../../sharedComponent/ButtonCom';
import Loader from '../../sharedComponent/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../action/authAction';
import { errorObj, userObj } from '../../utils/staticObj';

const Login = () => {
  const [user, setUser] = useState(userObj);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(errorObj)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError((prevError) => ({
      ...prevError,
      emailError: name === "email" ? validateEmail(value) : prevError.emailError,
      passwordError: name === "password" ? validatePassword(value) : prevError.passwordError,
    }));
  };

  const validate = () => {
    const errors = {};
    errors.emailError = validateEmail(user.email);
    errors.passwordError = validatePassword(user.password);
    setError(errors);
    return Object.values(errors).every((val) => !val);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(errorObj);
    (validate()) && dispatch(loginUser(user, navigate));
  }
  
  return (
    <div className='authContainer' >
      {loading && <Loader />}
      <div className='authInnerDiv'>
        <form onSubmit={handleSubmit} className='form' >
          <h1 className='authHeading'>Login </h1>
          <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
          <InputCom type='email' value={user.email} onChange={(e) => handleChange(e)} id='email' name='email' />
          <br />
          <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
          <InputCom type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
          <div style={{ textAlign: 'center', marginBottom: "20px" }}>
            <ButtonCom text='Login' type='submit' />
          </div>
          <p ><Link to='/forgetPassword' style={{ textDecoration: 'underline' }}>Forget password</Link></p>
          <br />
          <p style={{ marginLeft: "20px" }}>Don't have an account? <Link to='/signup' style={{ textDecoration: 'underline' }}> Register </Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login

