import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
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
      Hello users
      {users.length ? renderusers() : ''}
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
