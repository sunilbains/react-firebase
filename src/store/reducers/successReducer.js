import { GET_SUCCESS, CLEAR_SUCCESS } from '../constants/success';

const successReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    case CLEAR_SUCCESS:
      return '';
    default:
      return state;
  }
};

export default successReducer;
