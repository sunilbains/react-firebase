import React from 'react';
import { Switch, Route } from 'react-router';
// import MyFriends from '../friends/my-friends.component';
// import Employees from '../employees/index.js';
// import MyRequestsPage from '../friends/my-requests.component';
import ListUsers from './users/ListUsers';
import Login from './auth/loginComponent';
import Dashboard from './Dashboard/dashboard';
// import AddUserPage from '../users/add-user.component';
// import AddUserFun from '../users/add-user-fun.component';
// import Friend from '../../pages/friends/profile';
// import Chat from '../../pages/chatting/chat';
// import Inbox from '../../pages/chatting/inbox';
import AuthRoute from './auth/AuthRoute';
import PrivateRoute from './auth/PrivateRoute';

// const HomePage = () => <div>This is a Home Page</div>;
import HomePage from './Home/Home';

const Routes = (props) => (
  <>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/" exact component={Dashboard} />
      {/* <Route path="/inbox">
        <Inbox />
      </Route> */}
      {/* <Route path="/add-user" component={AddUserPage} />
      <Route path="/add-user-fun" component={AddUserFun} />
      <Route path="/friend/:_id" component={Friend} />
      <Route path="/chat/:_id" component={Chat} /> */}

      <PrivateRoute component={ListUsers} path="/users" exact />
      {/* <PrivateRoute component={MyRequestsPage} path="/my-requests" exact />
      <PrivateRoute component={MyFriends} path="/my-friends" exact />
      <PrivateRoute component={Employees} path="/employees" exact /> */}
      <AuthRoute component={Login} path="/login" exact />
    </Switch>
  </>
);

export default Routes;
