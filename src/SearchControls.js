import React from 'react'
import petfinder from './petfinder-client'
const pf = petfinder()

const SearchControls = React.createClass({
  getInitialState () {
    return {
      breeds: []
    }
  },
  componentDidMount () {
    pf.breed.list({animal: this.props.animal})
      .then((data) => {
        if (data.petfinder.breeds) {
          this.setState({breeds: data.petfinder.breeds.breed})
        }
      })
  },
  handleBreedChange (event) {
    this.props.changeBreed(event.target.value)
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
        {breedSelector}
      </div>
    )
  }
})

export default SearchControls









