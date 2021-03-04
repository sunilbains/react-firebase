import { combineReducers } from 'redux';
import users from './usersReducer';
import employees from './employeesReducer';
import errors from './errorReducer';
import success from './successReducer';

const reducers = combineReducers({
  users,
  employees,
  errors,
  success,
});

export default reducers;
