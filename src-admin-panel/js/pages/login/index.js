import { connect } from 'react-redux';
import { login } from '../../reducers/auth/actions';
import View from './view';

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
});

export default connect(
  null,
  mapDispatchToProps
)(View);
