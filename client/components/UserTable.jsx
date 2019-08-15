import React from 'react';

import Table from 'react-bootstrap/Table';

function UserTable({ users }) {
  return (
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
        {users.map(({ id, name, cars, mobile, skype }, index) => (
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
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
