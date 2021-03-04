import React from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const Dashboard = () => (
  <>
    <Sidebar />
    <Header />
    <section id="content-wrapper">
      <div className="row">
        <h2 className="content-title">Dashboard</h2>
        <div className="main">
          <div className="col-md-6 col-sm-12" />
        </div>
      </div>
    </section>
  </>
);

export default Dashboard;
