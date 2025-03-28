import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ButtonCom from "../../shared/ButtonCom";
import InputCom from "../../shared/InputCom";
import Loader from "../../shared/Loader";
import { putRequest } from "../../utils/api";
import { getCookie } from "../../utils/getCookie";
import validate from "../../utils/validate";
import "./css/student.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = getCookie("authUser");
  const token = getCookie("authToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: user?.name || "Unknown",
    email: user?.email || "data not found",
  });
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError(validate(e.target.name, e.target.value));
      if (e.target.value.trim() === data?.name.trim()) {
        setError("Updated name is same as actual name");
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = validate("name", name);
    if (value) {
      setError(value);
      return;
    }
    if (error) {
      return;
    }
    try {
      setLoading(true);
      const response = await putRequest(
        "student/studentProfile",
        { name },
        { "access-token": token },
      );
      if (response.statusCode === 200) {
        toast.success("Name updated Successfully");
        setData({ ...data, name: name });
        document.cookie = `authUser=${JSON.stringify({...user,name:name})};path=/; max-age=${60 * 60}; secure`;
        dispatch({ type: "CHANGE_NAME", payload: name });
      } else {
        toast.error(response?.message || "Error occurred");
      }
    } finally {
      setLoading(false);
      setName("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        margin: "30px 0px",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      {loading && <Loader />}
      <h1 className="heading">Edit Name</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "10px 0px",
        }}
      >
        <p>Name: {data?.name}</p>
        <p>Email: {data?.email}</p>
      </div>
      <hr className="horizontalRule" />
      <form style={{ marginTop: "10px" }}>
        {error && <span className="error">{error}</span>}
        <InputCom
          type="name"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name..."
        />
        <ButtonCom onClick={handleSubmit}>Submit</ButtonCom>
      </form>
    </div>
  );
};

export default EditProfile;
