import { SET_BREED } from './actions'

const INITIAL_STATE = {
  breed: 'Havanese'
}

const setBreed = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {breed: action.breed})
  return newState
}

const rootReducer = function (state, action) {
  // init state
  if (!state) {
    state = {}
    Object.assign(state, INITIAL_STATE)
  }

  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action)
    default:
      return state
  }
}

export default rootReducer











