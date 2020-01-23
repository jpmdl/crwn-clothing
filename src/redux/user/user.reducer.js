// state for current user
// 'state' object that represents the last state and an 'action' like the object below:
// {
//    type: '',   // specific action
//    payload: '' // any object to set as value or to transform to anything else
// }
// this action is defined in user.actions.js file
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null
};

// every single reducer gets every action ever fired, even the ones we don't care about, that's why we return a default state
const userReducer = (state = INITIAL_STATE, action) => {
  // ES6 feature that sets the default value if undefined
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }; // spread state to do not mess with the other state variables
    default:
      return state;
  }
};

export default userReducer;
