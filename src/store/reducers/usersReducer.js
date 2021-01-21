const authState = {
  getUsers: [],
  getUser: {},
};

const users = (state = authState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, getUsers: action.payload };
    case 'GET_USER':
      return { ...state, getUser: action.payload };
    default:
      return state;
  }
};

export default users;
