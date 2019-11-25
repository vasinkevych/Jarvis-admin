import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../components/Loader';
import UserTable from '../components/UserTable';
import ReloadButton from '../components/ReloadButton';

import user from '../services/User';

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

const Users = () => {
  const getLatestUsers = refetch => {
    return async () => {
      await user.parseUsers();
      return refetch();
    };
  };

  return (
    <Query query={USERS_QUERY}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <Loader />;
        if (error) return <div>Error</div>;

        const users = data.users || [];

        return (
          <div>
            <Row className="mt-5 justify-content-end">
              <Col className="d-flex justify-content-end">
                <ReloadButton
                  title="Reload Users"
                  onAsyncReload={getLatestUsers(refetch)}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <UserTable users={users} loading={loading} />
              </Col>
            </Row>
          </div>
        );
      }}
    </Query>
  );
};

export default Users;
