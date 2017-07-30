import { SET_BREED, SET_PETS } from './actions';

const DEFAULT_STATE = {
  breed: 'Havanese',
  animal: 'dog',
  pets: [],
  location: 'San Francisco, CA'
};

const setBreed = function(state, action) {
  return Object.assign({}, state, { breed: action.payload });
};

const setPets = function(state, action) {
  return Object.assign({}, state, { pets: action.payload });
};

const rootReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action);
    case SET_PETS:
      return setPets(state, action);
    default:
      return state;
  }
};

export default rootReducer;
