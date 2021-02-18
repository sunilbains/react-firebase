const authState = {
  getUsers: [],
  getUser: {},
  addUser: {},
  updateUser: {},
  deleteUser: {},
};

const users = (state = authState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, getUsers: action.payload };
    case 'GET_USER':
      return { ...state, getUser: action.payload };
    case 'ADD_USER':
      return { ...state, addUser: action.payload };
    case 'UPDATE_USER':
      return { ...state, addUser: action.payload };
    case 'DELETE_USER':
      return { ...state, deleteUser: action.payload };
    default:
      return state;
  }
};

export default users;
