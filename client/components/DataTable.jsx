import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Paginator from './Paginator';

const DataTable = ({ data, action }) => {
  if (!data && !data.length) return <h1>No data</h1>;

  return (
    <Paginator step={15} data={data}>
      {paginatedData => (
        <Table striped bordered hover className={'mt-2'}>
          <thead>
            <tr>
              {Object.keys(data[0]).map(key => (
                <th key={data[0][key]}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((dataObj, index) => (
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
      )}
    </Paginator>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func
};

export default DataTable;
