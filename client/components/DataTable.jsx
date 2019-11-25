import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

const DataTable = ({ data, action }) => {
  if (!data && !data.length) return <h1>No data</h1>;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(data[0]).map(key => (
            <th key={data[0][key]}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataObj, index) => (
          <tr
            key={dataObj.id + 1 ? dataObj.id : index}
            onClick={action ? action.bind(null, dataObj) : () => ''}
          >
            {Object.keys(dataObj).map(dataKey => (
              <td key={dataObj[dataKey]}>{dataObj[dataKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func
};

export default DataTable;
