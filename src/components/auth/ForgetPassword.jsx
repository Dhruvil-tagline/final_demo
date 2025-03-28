import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCom from "../../shared/ButtonCom";
import InputCom from "../../shared/InputCom";
import Loader from "../../shared/Loader";
import { postRequest } from "../../utils/api";
import validate from "../../utils/validate";
import "./css/auth.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error) {
      setError(validate(e.target.name, value));
    }
  };

  const searchUser = async () => {
    try {
      setLoading(true);
      let response = await postRequest("users/ForgotPassword", {
        data: { email },
        errorMessage: "User not fond",
      });
      if (response.statusCode === 200) {
        toast.success(response?.message);
        navigate("/login");
      } else {
        toast.error(response?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    let emailValidate = validate("email", email);
    if (emailValidate) {
      setError(emailValidate);
    } else {
      searchUser();
    }
  };

  return (
    <div className="authContainer">
      {loading && <Loader />}
      <div className="authInnerDiv">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="authHeading">Forget Password</h1> <br />
          <span className="error">{error}</span>
          <InputCom
            type="text"
            placeholder="Enter your email..."
            name="email"
            value={email}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <ButtonCom type="submit">Submit</ButtonCom>
            <ButtonCom type="button" onClick={() => navigate(-1)}>
              Back
            </ButtonCom>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
