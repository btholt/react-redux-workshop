import React from 'react'
import credentials from './credentials'
import petfinder from './petfinder-client'
const pf = petfinder(credentials)

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: []
    }
  }
  componentDidMount () {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
      this.setState({pets})
    })
  }
  render () {
    return (
      <div className='app'>
        <img src='adopt-me.png' alt='adopt-me logo' />
        <div>
          <pre><code>
            {JSON.stringify(this.state, null, 4)}
          </code></pre>
        </div>
      </div>
    )
  }
}

export default App
