import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
  }, []);

  return (
    <>
      <div id="navbar-wrapper">
        <nav className=" knavbar-inverse">
          <div className="">
            <div className="navbar-header navbar navbar-expand-lg">
              <a href="/" className="navbar-brand" id="sidebar-toggle">
                <i className="fa fa-bars" />
              </a>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/home" className="nav-link">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={() => localStorage.clear()}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
