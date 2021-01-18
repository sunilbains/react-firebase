import React from 'react';
import { Route } from 'react-router-dom';

const AuthRoute = ({ props, component: Component, ...rest }) => {
  const computeRenderProps = (props) =>
    localStorage.getItem('accessToken') ? (
      props.history.goBack()
    ) : (
      <Component {...props} />
    );
  return <Route {...rest} render={computeRenderProps} />;
};

export default AuthRoute;
