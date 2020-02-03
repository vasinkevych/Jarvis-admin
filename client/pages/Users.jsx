import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../components/Loader';
import UserTable from '../components/UserTable';
import ReloadButton from '../components/ReloadButton';
import QueryBoundary from '../components/QueryBoundary';

import user from '../services/User';
import NotificationContext from '../context/alert/notificationContext';

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
  const { notifyError, notifySuccess } = useContext(NotificationContext);

  const getLatestUsers = refetch => {
    return async () => {
      try {
        await user.parseUsers();
        notifySuccess('Users were parsed successfully');
      } catch (e) {
        notifyError(e.message);
      }
      return refetch();
    };
  };

  return (
    <QueryBoundary>
      <Query query={USERS_QUERY}>
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading) return <Loader />;
          if (networkStatus === 8) throw new Error('Network connection error');
          if (error) {
            notifyError(error.message);
            return <div>Error</div>;
          }

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
                  <UserTable users={users} />
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    </QueryBoundary>
  );
};

export default Users;
