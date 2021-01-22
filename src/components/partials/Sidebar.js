import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assests/static-images/logo.jpg';

const Sidebar = () => (
  <>
    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <div className="">
          <Link to="/" className="nav-link">
            <img src={logo} alt="logo" width="70px" height="70px" />
          </Link>
        </div>
      </div>
      <ul className="sidebar-nav">
        <li className="active">
          <Link to="/home">
            <i className="fa fa-home" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="fa fa-user" />
            Users
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="fa fa-plug" />
            Plugins
          </Link>
        </li>
      </ul>
    </aside>
  </>
);

export default Sidebar;
