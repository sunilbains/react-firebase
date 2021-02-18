import React from 'react';
import { Switch } from 'react-router';
import ListUsers from './users/ListUsers';
import AddUser from './users/AddUser';
import ListEmployees from './Employees/ListEmployees';
import Login from './auth/loginComponent';
import Register from './auth/RegisterComponent';
import Dashboard from './Dashboard/dashboard';
import AuthRoute from './auth/AuthRoute';
import PrivateRoute from './auth/PrivateRoute';
import HomePage from './Home/Home';

const Routes = () => (
  <>
    <Switch>
      <PrivateRoute path="/home" exact component={HomePage} />
      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/users" component={ListUsers} exact />
      <PrivateRoute path="/add-user" component={AddUser} exact />
      <PrivateRoute path="/employees" component={ListEmployees} exact />
      <AuthRoute component={Login} path="/login" exact />
      <AuthRoute component={Register} path="/register" exact />
    </Switch>
  </>
);

export default Routes;
