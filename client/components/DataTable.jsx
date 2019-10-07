import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import SearchForm from "./SerachForm";
import PropTypes from "prop-types";
import { filterTable } from "../services/System";

const DataTable = props => {
  const { data } = props;
  const [searchVal, setSearchVal] = useState("");

  const handleSearchChange = e => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      <SearchForm searchVal={searchVal} setSearchVal={handleSearchChange} />
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(data[0]).map(key => (
              <th key={data[0][key]}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterTable(data, searchVal).map((dataObj, index) => (
            <tr key={dataObj.id + 1 ? dataObj.id : index}>
              {Object.keys(dataObj).map(dataKey => (
                <td key={dataObj[dataKey]}>{dataObj[dataKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

DataTable.propTypes = {
  data: PropTypes.array
};

export default DataTable;
