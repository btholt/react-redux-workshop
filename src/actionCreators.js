import { SET_BREED } from './actions'

export function setBreed (breed) {
  return { type: SET_BREED, breed: breed }
}