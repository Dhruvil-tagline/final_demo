import classNames from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import exam from "../assets/exam.png";
import menu from "../assets/menu.svg";
import "../Css/Navbar.css";
import ButtonCom from "../shared/ButtonCom";
import { getCookie } from "../utils/getCookie";
import { studentNavObj, teacherNavObj } from "../utils/staticObj";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = getCookie("authUser");
  let navObj = user?.role === "teacher" ? teacherNavObj : studentNavObj;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    document.cookie = "authToken=; path=/; max-age=0";
    document.cookie = "authUser=; path=/; max-age=0";
    toast.success("Logout Successfully");
    navigate("/login");
  };
  const navClass = classNames("mobile", { mobileView: openNav });
  return (
    <div>
      <div className="navbar" >
        <div className="logoDiv">
          <div className="logoAndMenu">
            <div className="logo">
              <img src={exam} alt="ExamCite" height="40px" width="40px" />
            </div>
            <div className="menuDiv">
              <img
                src={menu}
                alt="Menu"
                className="menuBtn"
                onClick={() => setOpenNav(!openNav)}
              />
            </div>
          </div>
          <nav className={navClass}>
            <div className="innerNav">
              {navObj &&
                navObj.map((val, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      isActive ? "active" : "navAnchor"
                    }
                    to={val.to}
                  >
                    {val.text}
                  </NavLink>
                ))}
            </div>
          </nav>
        </div>
        <div className={navClass} >
        <p> Welcome {user?.role}</p>
          <ButtonCom onClick={handleLogout}>Logout</ButtonCom>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
