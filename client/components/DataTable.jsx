import React from "react";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

export default function DataTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(props.data[0]).map(key => (
            <th key={props.data[0][key]}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((dataObj, index) => (
          <tr key={dataObj.id + 1 ? dataObj.id : index}>
            {Object.keys(dataObj).map(dataKey => (
              <td key={dataObj[dataKey]}>{dataObj[dataKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

DataTable.propTypes = {
  data: PropTypes.array
};
