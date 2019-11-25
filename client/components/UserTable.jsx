import React, { useState } from 'react';
import { filterTable } from '../services/System';
import SearchForm from './SerachForm';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

function UserTable({ users, loading }) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = e => setSearchVal(e.target.value);

  if (!users && !users.length) return <h1>No users</h1>;

  return (
    <>
      <SearchForm setSearchVal={handleSearchChange} searchVal={searchVal} />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Cars</th>
            <th>Mobile</th>
            <th>Skype</th>
          </tr>
        </thead>
        <tbody>
          {filterTable(users, searchVal).map(
            ({ id, name, cars, mobile, skype }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>
                  {cars.map((car, index) => (
                    <div key={index}>{`${car.number} ${car.brand}`}</div>
                  ))}
                </td>
                <td>
                  {mobile.map((mob, index) => (
                    <div key={index}>{mob}</div>
                  ))}
                </td>
                <td>{skype}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool
};

export default UserTable;
