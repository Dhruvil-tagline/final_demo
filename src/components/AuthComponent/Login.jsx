import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../action/authAction";
import ButtonCom from "../../shared/ButtonCom";
import InputCom from "../../shared/InputCom";
import Loader from "../../shared/Loader";
import { errorObj, userObj } from "../../utils/staticObj";
import validate from "../../utils/validate";
import "./AuthCss/SignUp.css";

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(userObj);
  const { loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(errorObj);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    const errors = validate(name, value);
    setError({ ...error, [name]: errors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    Object.entries(user).forEach(([key, value]) => {
      errors[key] = validate(key, value);
    });
    setError(errors);
    Object.values(errors).every((val) => !val) &&
      dispatch(loginUser(user, navigate));
  };

  return (
    <div className="authContainer">
      {loading && <Loader />}
      <div className="authInnerDiv">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="authHeading">Login </h1>
          <label htmlFor="email">Email:</label>
          <span className="error">{error.email}</span> <br />
          <InputCom
            type="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">Password:</label>
          <span className="error">{error.password}</span> <br />
          <InputCom
            type="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            id="password"
            name="password"
          />
          <br />
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <ButtonCom text="Login" type="submit">
              Login
            </ButtonCom>
          </div>
          <p>
            <Link to="/forgetPassword" style={{ textDecoration: "underline" }}>
              Forget password
            </Link>
          </p>
          <br />
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>Don't have an account?</p>
            <Link to="/signup" style={{ textDecoration: "underline" }}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
