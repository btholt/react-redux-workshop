import React, { Component } from 'react';
import credentials from './credentials';
import petfinder from './petfinder-client';
import Pet from './Pet';
import SearchControls from './SearchControls';
const pf = petfinder(credentials);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: []
    };

    this.changeBreed = this.changeBreed.bind(this);
  }
  componentDidMount() {
    const { animal, breed, location } = this.state;
    const promise = pf.pet.find({
      animal,
      breed,
      location,
      output: 'full'
    });

    promise.then(data => {
      const pets = data.petfinder.pets ? data.petfinder.pets.pet : [];
      this.setState({ pets });
    });
  }
  changeBreed(breed) {
    this.setState({ breed });
  }
  render() {
    return (
      <div className="app">
        <img src="/adopt-me.png" alt="adopt-me logo" />
        <SearchControls breed={this.state.breed} animal={this.state.animal} changeBreed={this.changeBreed} />
        {this.state.pets.map(pet => <Pet key={pet.id} pet={pet} />)}
      </div>
    );
  }
}

export default App;
