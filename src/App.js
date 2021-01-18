import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import ListUsers from './components/users/ListUsers';
import AllRoutes from './components/routes';

const App = () => (
  <BrowserRouter>
    <AllRoutes />
    {/* <ListUsers /> */}
  </BrowserRouter>
);

export default App;
