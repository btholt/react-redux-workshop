import React from 'react'
import logo from './adopt-me.png'
import credentials from './credentials'
import petfinder from './petfinder-client'
import PetList from './PetList'
import SearchControls from './SearchControls'
import { Provider, connect } from 'react-redux'
import store from './store'
const pf = petfinder(credentials)

const App = React.createClass({
  getInitialState () {
    return {
      animal: 'dog',
      location: 'San Francisco, CA',
      pets: [],
      favorites: []
    }
  },
  componentDidMount () {
    this.search()
  },
  search () {
    const { animal, location } = this.state
    const { breed } = this.props
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

const mapStateToProps = function(state) {
  return {
    breed: state.breed
  }
}

const ConnectedApp = connect(mapStateToProps)(App)
const ProvidedApp = function (props) {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

export default ProvidedApp
















