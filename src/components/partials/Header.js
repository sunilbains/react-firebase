import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Header = () => {
  const [dropdownOpen, setOpen] = useState(false);

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
                <ButtonDropdown
                  isOpen={dropdownOpen}
                  toggle={() => {
                    setOpen(!dropdownOpen);
                  }}
                >
                  <DropdownToggle
                    caret
                    color="default"
                    className="text-primary notification"
                    size="sm"
                  >
                    <span className="not-count">4</span>
                    <i className="fa fa-bell" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
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
                    className="nav-link"
                    href="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v" aria-hidden="true" />
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
