import { SET_BREED, SET_PETS } from './actions';
import petfinder from './petfinder-client';

const pf = petfinder();

export const setBreed = breed => ({ type: SET_BREED, payload: breed });
export const setPets = pets => ({ type: SET_PETS, payload: pets });

export function search() {
  return function(dispatch, getState) {
    const state = getState();
    const { breed, animal, location } = state;
    pf.pet.find({ animal, breed, location, output: 'full' }).then(data => {
      let pets = data.petfinder.pets ? data.petfinder.pets.pet : [];
      pets = Array.isArray(pets) ? pets : [pets];
      dispatch(setPets(pets));
    });
  };
}
