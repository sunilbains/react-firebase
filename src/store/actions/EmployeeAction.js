import { getMethod } from '../../utils/methods';
import { API_URL } from '../../constants/config';

export const getEmployees = (query) => async (dispatch) => {
  const rr = await getMethod(`${API_URL}/employees?${query}`);

  if (rr.status === 200) {
    return dispatch({ type: 'GET_EMPLOYEES', payload: rr.data });
  }
  if (rr.status === 400 || rr.status === 500) {
    return dispatch({ type: 'GET_ERRORS', payload: rr });
  }
  return true;
};

// // Get User
export const getEmployee = (id) => (dispatch) => {
  // console.log('s', id);
  dispatch({ type: 'GET_EMPLOYEE', payload: id });
  // fetch(`https://jsonplaceholder.typicode.com/users`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     dispatch({ type: 'GET_USER', payload: data });
  //   })
  //   .catch((err) =>
  //     dispatch({
  //       type: 'GET_ERROR',
  //       // payload: err.response.data.message
  //       payload: err,
  //     }),
  //   );
};

// // Set logged in user
// export const setCurrentUser = (userProfileDetail) => ({
//   type: 'SET_CURRENT_USER',
//   payload: userProfileDetail,
// });

// // Set user auth true
// export const setAuthTrue = (payload) => ({
//   type: 'SET_AUTH_TRUE',
//   payload,
// });

// // Log user out
// export const logoutUser = (history) => (dispatch) => {
//   // Remove token from localStorage
//   localStorage.removeItem('jwtToken');
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
//   // history.push('/login');
// };

// // Clear error
// export const clearError = () => ({
//   type: 'CLEAR_ERROR',
// });

// // Clear success
// export const clearSuccess = () => ({
//   type: 'CLEAR_SUCCESS',
// });

// // empty fetched user
// export const emptyFetchedUser = () => (dispatch) =>
//   dispatch({
//     type: 'EMPTY_FETCHED_USER',
//   });
