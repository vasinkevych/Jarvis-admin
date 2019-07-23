import { combineReducers } from 'redux';
import migrations from './migrationsReducers';
import system from './mysqlReducers';
import users from './users';
import auth from './auth';

export default combineReducers({
  migrations,
  system,
  users,
  auth
});
