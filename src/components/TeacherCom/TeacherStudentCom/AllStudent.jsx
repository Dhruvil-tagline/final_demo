import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allStudentList } from "../../../action/teacherStudent";
import ButtonCom from "../../../shared/ButtonCom";
import Table from "../../../shared/Table";
import { allStudentHeader } from "../../../utils/staticObj";
import "../TeacherComCss/slider.css";

const AllStudent = () => {
  const allStudentArray = useSelector((state) => state.teacherStudent);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [allStudent, setAllStudent] = useState(true);
  const [data, setData] = useState([]);
  const verifiedStudent =
    !!allStudentArray?.allStudent.length &&
    allStudentArray?.allStudent.filter((val) => val.status === "Active");

  useEffect(() => {
    dispatch(allStudentList("dashboard/Teachers", token));
  }, [token]);

  useEffect(() => {
    if (allStudent) {
      setData(allStudentArray?.allStudent);
    } else {
      setData(verifiedStudent);
    }
  }, [allStudent, allStudentArray]);

  const tableData = useMemo(() => {
    return (
      !!data.length &&
      data.map((val, index) => ({
        Index: index,
        Name: val.name,
        Email: val.email,
        Status: val.status,
        Action: (
          <ButtonCom
            id={val._id}
            onClick={() => navigate(`/student/${val._id}`)}
          >
            student Details
          </ButtonCom>
        ),
      }))
    );
  }, [data]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "700px",
          padding: "20px",
          gap: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "rgb(18, 219, 206)" }}>
          {allStudent ? "All Students" : "Verified Students"}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p style={{ fontSize: "18px" }}> See Verified Students </p>

          <label className="switch">
            <input type="checkbox" onClick={() => setAllStudent(!allStudent)} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Table
          tableHeader={allStudentHeader}
          tableData={tableData}
          isLoading={allStudentArray?.loading}
          error={allStudentArray?.error}
        />
      </div>
    </div>
  );
};

export default AllStudent;
