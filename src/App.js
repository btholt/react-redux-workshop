import React from 'react'
import logo from './adopt-me.png'
import credentials from './credentials'
import petfinder from './petfinder-client'
import PetList from './PetList'
import SearchControls from './SearchControls'
const pf = petfinder(credentials)

const App = React.createClass({
  getInitialState () {
    return {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: [],
      favorites: []
    }
  },
  componentDidMount () {
    this.search()
  },
  search () {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({
      animal: animal,
      breed: breed,
      location: location,
      output: 'full'
    })

    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({pets})
    })
  },
  changeAnimal (animal) {
    this.setState({animal, breed: ''}, () => {
      this.search()
    })
  },
  changeBreed (breed) {
    this.setState({breed}, () => {
      this.search()
    })
  },
  toggleFavorite(pet, toAdd) {
    let favorites = this.state.favorites
    if (toAdd) {
      favorites = favorites.concat(pet)
    } else {
      favorites = favorites.filter((current) => {
        return pet.id !== current.id
      })
    }

    this.setState({favorites: favorites})
  },
  render () {
    return (
      <div className='app'>
        <img src={logo} alt='adopt-me logo' />
        <SearchControls
          animal={this.state.animal}
          breed={this.state.breed}
          changeBreed={this.changeBreed}
          changeAnimal={this.changeAnimal}
        />
        <PetList
          pets={this.state.pets}
          title='Search Results'
          toggleFavorite={this.toggleFavorite}
          favorites={this.state.favorites}
        />
        <PetList
          pets={this.state.favorites}
          title='Favorites'
          toggleFavorite={this.toggleFavorite}
          favorites={this.state.favorites}
        />
      </div>
    )
  }
})

export default App