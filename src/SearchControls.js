import React from 'react'
import petfinder, { ANIMALS } from './petfinder-client'
const pf = petfinder()

const SearchControls = React.createClass({
  getInitialState () {
    return {
      breeds: []
    }
  },
  componentDidMount () {
    this.getNewBreeds(this.props.animal)
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal)
    }
  },
  getNewBreeds (animal) {
    pf.breed.list({animal: animal})
      .then((data) => {
        if (data.petfinder.breeds) {
          this.setState({breeds: data.petfinder.breeds.breed})
        }
      })
  },
  handleBreedChange (event) {
    this.props.changeBreed(event.target.value)
  },
  handleAnimalChange (event) {
    this.props.changeAnimal(event.target.value)
  },
  render () {
    let breedSelector
    if (this.props.animal) {
      breedSelector = (
        <select onChange={this.handleBreedChange} value={this.props.breed}>
          <option value=''></option>
          {this.state.breeds.map((breed) => {
            return (
              <option key={breed} value={breed}>{breed}</option>
            )
          })}
        </select>
      )
    }
    return (
      <div className='search'>
        <select value={this.props.animal} onChange={this.handleAnimalChange}>
          <option value=''></option>
          {ANIMALS.map((animal) => {
            return (
              <option key={animal} value={animal}>{animal}</option>
            )
          })}
        </select>
        {breedSelector}
      </div>
    )
  }
})

export default SearchControls









