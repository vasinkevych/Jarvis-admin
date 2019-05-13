import { combineReducers } from 'redux';
import migrations from './migrationsReducers';
import system from './mysqlReducers';

export default combineReducers({
  migrations,
  system
});
