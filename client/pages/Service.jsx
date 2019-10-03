import React, { useState } from "react";
import * as systemService from "../services/System";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DataTable from "../components/DataTable";

let tableData = [];

export default props => {
  const [tableData, setTableData] = useState([]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <p
          onClick={() => {
            console.log(tableData);
          }}
          style={{
            display: "block",
            alightItems: "baseline"
          }}
        >
          Enter sql query
        </p>
        <textarea
          style={{
            width: 300,
            resize: "none",
            padding: 8
          }}
          placeholder={"enter sql query"}
          onChange={setSequelValue}
        />
        <Button
          variant="primary"
          onClick={async () => {
            let temp = await sendData();
            setTableData(temp.result);
          }}
        >
          Send
        </Button>
      </div>
      {tableData.length > 0 && <DataTable data={tableData} />}
    </Container>
  );
};

function setSequelValue(e) {
  systemService.setQuery(e.target.value);
}

async function sendData() {
  tableData = await systemService.fetchTableData(systemService.getQuery());
  return tableData;
}
