import { SET_PETS, SET_BREED, SET_ANIMAL, ADD_FAVORITE, REMOVE_FAVORITE, SET_BREEDS } from './actions'

const setPets = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {pets: action.pets})
  return newState
}

const setBreed = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {breed: action.breed})
  return newState
}

const setAnimal = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {animal: action.animal, breed: ''})
  return newState
}

const addFavorite = function (state, action) {
  const newState = {}
  const { favorites } = state
  Object.assign(newState, state, { favorites: favorites.concat(action.pet) })
  return newState
}

const removeFavorite = function (state, action) {
  const newState = {}
  const { favorites } = state
  Object.assign(newState, state, { favorites: favorites.filter((current) => action.pet.id !== current.id) })
  return newState
}

const setBreeds = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {breeds: action.breeds})
  return newState
}

const rootReducer = function (state, action) {
  // init state
  if (!state) {
    state = {
      pets: [],
      favorites: [],
      animal: 'dog',
      breed: 'Havanese',
      breeds: [],
      location: 'San Francisco, CA'
    }
  }

  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action)
    case SET_PETS:
      return setPets(state, action)
    case SET_ANIMAL:
      return setAnimal(state, action)
    case ADD_FAVORITE:
      return addFavorite(state, action)
    case REMOVE_FAVORITE:
      return removeFavorite(state, action)
    case SET_BREEDS:
      return setBreeds(state, action)
    default:
      return state
  }
}

export default rootReducer
