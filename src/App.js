import React from 'react'
import logo from './adopt-me.png'
import credentials from './credentials'
import petfinder from './petfinder-client'
import Pet from './Pet'
import SearchControls from './SearchControls'
const pf = petfinder(credentials)

const App = React.createClass({
  getInitialState () {
    return {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: []
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
  changeBreed (breed) {
    this.setState({breed}, () => {
      this.search()
    })
  },
  render () {
    return (
      <div className='app'>
        <img src={logo} alt='adopt-me logo' />
        <SearchControls
          animal={this.state.animal}
          breed={this.state.breed}
          changeBreed={this.changeBreed}
        />
        <div>
          {this.state.pets.map((pet) => {
            return (
              <Pet key={pet.id} pet={pet} />
            )
          })}
        </div>
      </div>
    )
  }
})

export default App