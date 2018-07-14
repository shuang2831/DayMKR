import { types } from '../actions/rootActions';

// The types of actions that you can dispatch to modify the state of the store

// Initial state of the store
const initialState = {
  token: 'unknown',
  contacts: {},
  userInfo: {},
};

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case types.UPDATE_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case types.UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
