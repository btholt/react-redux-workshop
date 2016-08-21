import petfinder from './petfinder-client'
import credentials from './credentials'
import { SET_PETS, SET_BREED, SET_ANIMAL, ADD_FAVORITE, REMOVE_FAVORITE, SET_BREEDS } from './actions'
const pf = petfinder(credentials)

export function setBreed (breed) {
  return function(dispatch) {
      dispatch({ type: SET_BREED, breed })
      dispatch(search())
    }
}

export function setAnimal (animal) {
  return function(dispatch) {
    dispatch({ type: SET_ANIMAL, animal })
    dispatch(getBreeds())
    dispatch(search())
  }
}

export function addFavorite (pet) {
  return { type: ADD_FAVORITE, pet }
}

export function removeFavorite (pet) {
  return { type: REMOVE_FAVORITE, pet }
}

export function search () {
  return function (dispatch, getState) {
    const state = getState()
    const { breed, animal, location } = state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
      const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
      dispatch({ type: SET_PETS, pets })
    })
  }
}

export function getBreeds () {
  return function (dispatch, getState) {
    const { animal } = getState()
    pf.breed.list({animal})
      .then((data) => {
        console.log(data)
        let breeds = []
        if (data.petfinder.breeds) {
          breeds = data.petfinder.breeds.breed
        }
        dispatch({type: SET_BREEDS, breeds})
      })
  }
}