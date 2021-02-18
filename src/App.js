import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './components/routes';

const App = () => (
  <div id="wrapper" className="toggled">
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </div>
);

export default App;
