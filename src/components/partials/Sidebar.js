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
        <li
          className={
            window.location.pathname === '/' ||
            window.location.pathname === '/home'
              ? 'active'
              : ''
          }
        >
          <Link to="/home">
            <i className="fa fa-home" />
            Home
          </Link>
        </li>
        <li className={window.location.pathname === '/users' ? 'active' : ''}>
          <Link to="/users">
            <i className="fa fa-user" />
            Users
          </Link>
        </li>
        <li
          className={window.location.pathname === '/employees' ? 'active' : ''}
        >
          <Link to="/employees">
            <i className="fa fa-user" />
            Employees
          </Link>
        </li>
      </ul>
    </aside>
  </>
);

export default Sidebar;
