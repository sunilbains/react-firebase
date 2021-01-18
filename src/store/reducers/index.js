import { combineReducers } from 'redux';
import users from './usersReducer';
import errors from './errorReducer';
import success from './successReducer';

const reducers = combineReducers({
  users,
  errors,
  success,
});

export default reducers;
