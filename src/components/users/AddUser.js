import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
// import { Badge } from 'reactstrap';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import UserFields from './UserFields';
import BreadcrumbCom from '../partials/BreadcrumbCom';
import { addUser } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { newUser } = props;

  const BreadItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/users', label: 'Users' },
    { to: '/add-user', label: 'Add User', active: true },
  ];

  useEffect(() => {
    if (Object.values(newUser).length) {
      setLoading(false);
      Swal.fire('Success!!', 'User has been created successfully', 'success');
      dispatch({ type: 'ADD_USER', payload: {} });
    }
  }, [newUser, dispatch]);

  const onSubmit = (values) => {
    setLoading(true);
    console.log('submit', values);
    dispatch(addUser(values));
  };

  return (
    <>
      <Sidebar />
      <Header />
      <section id="content-wrapper">
        <BreadcrumbCom items={BreadItems} />
        <div className="main">
          <div className="col-lg-12 col-sm-12">
            <UserFields user={{}} onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  newUser: state.users.addUser,
  errors: state.errors,
});

ListUsers.propTypes = {
  newUser: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { addUser })(ListUsers);
