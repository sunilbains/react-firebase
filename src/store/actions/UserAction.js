import {
  getMethod,
  postMethod,
  updateMethod,
  deleteMethod,
} from '../../utils/methods';
import { API_URL } from '../../constants/config';

export const getUsers = () => async (dispatch) => {
  const res = await getMethod(`${API_URL}/users`);

  if (res.status === 200) {
    return dispatch({ type: 'GET_USERS', payload: res.data });
  }
  if (res.status === 400 || res.status === 500) {
    return dispatch({ type: 'GET_ERRORS', payload: res });
  }
  return true;
};

export const getUser = (id) => async (dispatch) => {
  const res = await getMethod(`${API_URL}/users/${id}`);

  if (res.status === 200) {
    return dispatch({ type: 'GET_USER', payload: res.data });
  }
  if (res.status === 400 || res.status === 500) {
    return dispatch({ type: 'GET_ERRORS', payload: res });
  }
  return true;
};

export const addUser = (userData) => async (dispatch) => {
  const res = await postMethod(`${API_URL}/add-user`, userData);

  if (res.status === 200) {
    return dispatch({ type: 'ADD_USER', payload: res });
  }
  if (res.status === 400 || res.status === 500 || res.status === 404) {
    return dispatch({ type: 'GET_ERRORS', payload: res });
  }
  return true;
};

export const updateUser = (id, userData) => async (dispatch) => {
  const res = await updateMethod(`${API_URL}/users/${id}`, userData);

  if (res.status === 200) {
    return dispatch({ type: 'UPDATE_USER', payload: res });
  }
  if (res.status === 400 || res.status === 500 || res.status === 404) {
    return dispatch({ type: 'GET_ERRORS', payload: res });
  }
  return true;
};

export const deleteUser = (id) => async (dispatch) => {
  const res = await deleteMethod(`${API_URL}/users/${id}`);

  if (res.status === 200) {
    return dispatch({ type: 'DELETE_USER', payload: res });
  }
  if (res.status === 400 || res.status === 500 || res.status === 404) {
    return dispatch({ type: 'GET_ERRORS', payload: res });
  }
  return true;
};

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
