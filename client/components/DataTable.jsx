import React from "react";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

export default function DataTable(props) {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(props.data[0]).map(key => (
              <th key={props.data[0][key]}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map(dataObj => (
            <tr key={dataObj.id}>
              <td>{dataObj.id}</td>
              <td>{dataObj.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

DataTable.propTypes = {
  data: PropTypes.array
};
