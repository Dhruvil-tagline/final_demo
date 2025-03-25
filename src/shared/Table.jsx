import "./ComponentCss/table.css";

const Table = ({ tableHeader, tableData, isLoading, minWidth }) => {
  return (
    <div className="table-container">
      <table style={{ minWidth: minWidth || "800px" }}>
        <thead>
          <tr>
            {!!tableHeader.length &&
              tableHeader.map((val, index) => <th key={index}>{val}</th>)}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={tableHeader.length} className="no-data" style={{color:"blue"}}>
                  Loading...
              </td>
            </tr>
          ) : tableData?.length ? (
            tableData?.map((val, index) => (
              <tr key={index}>
                {!!tableHeader.length &&
                  tableHeader.map((item, idx) => (
                    <td
                      key={idx}
                      style={{
                        color: val[item] === "Active" ? "green" : "inherit",
                      }}
                    >
                      {val[item]}
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeader.length} className="no-data"> Data not found </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
