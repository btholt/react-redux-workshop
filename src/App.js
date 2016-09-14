import React from 'react'
import logo from './adopt-me.png'
import credentials from './credentials'
import petfinder from './petfinder-client'
import Pet from './Pet'
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
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({
      animal,
      breed,
      location,
      output: 'full'
    })

    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({pets})
    })
  },
  render () {
    return (
      <div className='app'>
        <img src={logo} alt='adopt-me logo' />
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