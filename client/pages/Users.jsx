import React from 'react';

import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USERS_QUERY = gql`
  {
    users {
      id
      name
      cars {
        number
        brand
      }
      mobile
      skype
    }
  }
`;

class Users extends React.Component {
  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Spinner animation="border" role="status" variant="secondary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            );
          if (error) return <div>Error</div>;

          const users = data.users || [];

          return (
            <Row className="mt-5">
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
                      <td>{mobile}</td>
                      <td>{skype}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          );
        }}
      </Query>
    );
  }
}

export default Users;
