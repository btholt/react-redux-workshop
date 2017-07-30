import React, { Component } from 'react';
import credentials from './credentials';
import petfinder from './petfinder-client';
import logo from './adopt-me.png';
import Pet from './Pet';

const pf = petfinder(credentials);

class App extends Component {
  state = {
    animal: 'dog',
    breed: 'Havanese',
    location: 'San Francisco, CA',
    pets: []
  };
  componentDidMount() {
    const { animal, breed, location } = this.state;
    const promise = pf.pet.find({ animal, breed, location, output: 'full' });
    promise.then(data => {
      let pets = data.petfinder.pets ? data.petfinder.pets.pet : [];
      pets = Array.isArray(pets) ? pets : [pets];
      this.setState({ pets });
    });
  }
  render() {
    return (
      <div className="app">
        <img src={logo} />
        <div>
          {this.state.pets.map(pet => <Pet pet={pet} />)}
        </div>
      </div>
    );
  }
}

export default App;
