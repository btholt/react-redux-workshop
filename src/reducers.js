import { SET_BREED } from './actions';
const DEFAULT_STATE = {
  breed: 'Poodle'
};

const setBreed = (state, action) => {
  return Object.assign({}, state, { breed: action.breed });
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action);
    default:
      return state;
  }
};

export default rootReducer;
