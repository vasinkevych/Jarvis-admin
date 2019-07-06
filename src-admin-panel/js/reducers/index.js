import { combineReducers } from 'redux';
import migrations from './migrationsReducers';
import system from './mysqlReducers';
import users from './users';

export default combineReducers({
  migrations,
  system,
  users
});
