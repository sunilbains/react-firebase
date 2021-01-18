import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../store/actions/UserAction';

const ListUsers = (props) => {
  useEffect(() => {
    // console.log('here');
    props.getUsers();
  }, []);

  return <>Hello users</>;
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    users: state.users,
    errors: state.errors,
  };
};
export default connect(mapStateToProps, { getUsers })(ListUsers);
