import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { getUsers } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  const dispatch = useDispatch();
  const { users } = props;

  const renderusers = () => users.map((user) => user.name);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        <section id="content-wrapper">
          <div className="row">
            <h2 className="content-title">Users</h2>
            <div className="main">
              <div className="col-md-6 col-sm-12">
                {users.length ? renderusers() : ''}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.getUsers,
  errors: state.errors,
});

ListUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, { getUsers })(ListUsers);
