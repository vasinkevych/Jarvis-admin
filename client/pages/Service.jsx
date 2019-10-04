import React, { useState } from "react";
import * as systemService from "../services/System";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DataTable from "../components/DataTable";
import Form from "react-bootstrap/Form";

export default function Service() {
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState("");

  const setQueryData = e => setQuery(e.target.value);

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={"enter sql query"}
            onChange={setQueryData}
            style={{
              marginTop: 10,
              resize: "none"
            }}
          />
          <Button
            type={"submit"}
            variant="primary"
            onClick={async e => {
              e.preventDefault();
              let temp = await systemService.fetchTableData(query);
              setTableData(temp.result);
            }}
            style={{
              marginTop: 10
            }}
          >
            Send
          </Button>
        </Form.Group>
      </Form>

      {tableData.length > 0 && <DataTable data={tableData} />}
    </Container>
  );
}
