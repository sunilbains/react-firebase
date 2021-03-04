import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const computeRenderProps = (props) =>
    // if (user.isAuthenticated && user.user.roleId !== rest.roleId) {
    //   return <Redirect to="/" />;
    // }
    localStorage.getItem('accessToken') ? (
      <Component {...props} />
    ) : (
      props.history.push('/login')
    );
  return <Route {...rest} render={computeRenderProps} />;
};

export default PrivateRoute;
