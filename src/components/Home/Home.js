import React from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const Home = () => (
  <>
    <Sidebar />
    <Header />
    <section id="content-wrapper">
      <div className="row">
        <h2 className="content-title">Test</h2>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <button type="submit" className="btn btn-secondary">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Home;
