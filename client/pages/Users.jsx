import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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

class Users extends React.Component {
  getLatestUsers = refetch => {
    return async () => {
      await user.parseUsers();
      return refetch();
    };
  };

  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader />;
          if (error) return <div>Error</div>;

          const users = data.users || [];

          return (
            <Container>
              <Row className="mt-5 justify-content-end">
                <ReloadButton
                  title="Reload Users"
                  onAsyncReload={this.getLatestUsers(refetch)}
                />
              </Row>
              <Row className="mt-2">
                <UserTable users={users} />
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Users;
