import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Table from "../../shared/Table";
import { studentResultHeader } from "../../utils/staticObj";

const StudentResult = () => {
  const { state } = useLocation();
  const user = useSelector((state) => state.auth);

  const tableData = state?.Result.map((res, index) => ({
    Index: index + 1,
    Subject: res.subjectName,
    Score: res.score,
    Rank: res.rank,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <h1 style={{ color: " rgb(18, 219, 206)", padding:"0px 20px" }}>
        Hello" {user?.user?.name || "Unknown"} your Result is
      </h1>
      <p style={{ padding: "10px 0px" }}>
        {user?.user?.email || "Data not found"}
      </p>
      <div style={{ maxWidth: "900px", padding: "10px", width: "100%" }}>
        <Table
          tableData={tableData}
          tableHeader={studentResultHeader}
          minWidth={"450px"}
        />
      </div>
    </div>
  );
};

export default StudentResult;
