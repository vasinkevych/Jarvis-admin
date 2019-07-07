import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchUsers } from '../../reducers/users/actions';
import { getUsers } from '../../selectors/users';
import View from './view';

const mapStateToProps = createStructuredSelector({
  users: getUsers
});

const mapDispatchToProps = {
  fetchUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
