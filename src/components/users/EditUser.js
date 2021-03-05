import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import UserFields from './UserFields';
import BreadcrumbCom from '../partials/BreadcrumbCom';
import { getUser, updateUser } from '../../store/actions/UserAction';

const EditUser = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user, errors, updatedUser, history } = props;

  const BreadItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/users', label: 'Users' },
    { to: '/users', label: 'Edit User', active: true },
  ];

  useEffect(() => {
    dispatch(getUser(props.match.params.id));
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (Object.values(updatedUser).length) {
      setLoading(false);
      dispatch({ type: 'UPDATE_USER', payload: {} });
      dispatch({ type: 'GET_USER', payload: {} });
      Swal.fire({
        title: 'Success!!',
        text: updatedUser.message,
        icon: 'success',
      }).then((res) => {
        if (res) {
          history.push('/users');
        }
      });
    }
    if (Object.values(errors).length) {
      setLoading(false);
      Swal.fire('Warning!!', errors.message, 'warning');
      dispatch({ type: 'GET_ERRORS', payload: {} });
    }
  }, [user, errors, updatedUser, dispatch, history]);

  const onSubmit = (values) => {
    setLoading(true);
    console.log('update', values);
    dispatch(updateUser(props.match.params.id, values));
  };

  return (
    <>
      <Sidebar />
      <Header />
      <section id="content-wrapper">
        <BreadcrumbCom items={BreadItems} />
        <div className="main">
          <div className="col-lg-12 col-sm-12">
            <UserFields user={user} onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.users.getUser,
  updatedUser: state.users.updateUser,
  errors: state.errors,
});

EditUser.propTypes = {
  user: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  updatedUser: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { getUser })(EditUser);
