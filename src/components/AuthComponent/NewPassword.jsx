import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCom from "../../shared/ButtonCom";
import InputCom from "../../shared/InputCom";
import Loader from "../../shared/Loader";
import { getRequest, postRequest } from "../../utils/api";
import validate from "../../utils/validate";
import "./AuthCss/SignUp.css";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const [searchParams] = useSearchParams();
  let token = searchParams.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await getRequest("users/newPassword", token);
        if (response.statusCode !== 200) {
          toast.error(response?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await postRequest(
        `users/ForgogtPassword/Verify?token=${token}`,
        { Password: "", ConfirmPassword: "" },
      );
      if (response.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    Object.entries(data).forEach(([key, value]) => {
      error[key] = validate(key, value);
    });
    setErrors(error);
    if (data.password !== data.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "password is not matching",
      }));
    } else {
      Object.values(error).every((val) => !val) && fetchData();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    let error = {};
    if (name === "confirmPassword") {
      error = validate(name, value, data.password);
    } else {
      error = validate(name, value);
    }
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div className="authContainer">
      {loading && <Loader />}
      <div className="authInnerDiv">
        <form
          onSubmit={handleSubmit}
          className="form"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <h1 className="authHeading">Reset password</h1>
          <InputCom
            type="password"
            placeholder="New password..."
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
          <InputCom
            type="password"
            placeholder="Confirm password..."
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
          <span className="error">{errors.confirmPassword}</span>
          <div>
            <ButtonCom type="submit">Submit</ButtonCom>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPassword;
