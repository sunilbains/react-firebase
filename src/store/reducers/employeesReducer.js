const authState = {
  getEmployees: { employees: [], count: 0 },
  getEmployee: {},
};

const employees = (state = authState, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES':
      return { ...state, getEmployees: action.payload };
    case 'GET_EMPLOYEE':
      return { ...state, getEmployee: action.payload };
    default:
      return state;
  }
};

export default employees;
