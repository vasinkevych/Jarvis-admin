import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { login } from '../../reducers/auth/actions';
import { getAuthErrorDescription } from '../../selectors/auth';
import View from './view';

const mapStateToProps = createStructuredSelector({
  error: getAuthErrorDescription
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
