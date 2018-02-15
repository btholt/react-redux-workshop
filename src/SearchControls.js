import React from 'react'
import { connect } from 'react-redux'
import { setBreed, setAnimal, search, getBreeds } from './actionCreators'
import { ANIMALS } from './petfinder-client'

class SearchControls extends React.Component {
  componentDidMount() {
    this.props.dispatch(search())
    this.props.dispatch(getBreeds())
  }

  handleAnimalChange = (e) => {
    this.props.dispatch(setAnimal(e.target.value))
  };

  handleBreedChange = (e) => {
    this.props.dispatch(setBreed(e.target.value))
  };

  render() {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        {this.props.breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    )
    return (
      <div className='search'>
        <select value={this.props.animal} onChange={this.handleAnimalChange}>
          <option value=''></option>
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>{animal}</option>
          ))}
        </select>
        {breedSelector}
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    breed: state.breed,
    breeds: state.breeds,
    animal: state.animal
  }
}

export default connect(mapStateToProps)(SearchControls)
