import React from 'react';

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return users && users.length ? (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(users[0]).map(el => (
              <th key={el} scope="col">
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr title={user} key={i}>
              {Object.values(user).map((value, index) => (
                <td key={`${i}-${index}`} scope="col">
                  {Array.isArray(value)
                    ? value.map(val => <div key={val}>{val}</div>)
                    : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div> 'No data'</div>
    );
  }
}

export default Users;
