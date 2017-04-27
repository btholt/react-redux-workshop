import React, { Component } from 'react';
import credentials from './credentials';
import petfinder from './petfinder-client';
import Pet from './Pet';
import SearchControls from './SearchControls';
import { connect } from 'react-redux';
const pf = petfinder(credentials);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: 'dog',
      location: 'San Francisco, CA',
      pets: []
    };

    this.changeBreed = this.changeBreed.bind(this);
    this.changeAnimal = this.changeAnimal.bind(this);
  }
  componentDidMount() {
    this.search();
  }
  search() {
    const { animal, location } = this.state;
    const { breed } = this.props;
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
    this.setState({ breed }, () => this.search());
  }
  changeAnimal(animal) {
    this.setState({ animal, breed: '' }, () => this.search());
  }
  render() {
    return (
      <div className="app">
        <img src="/adopt-me.png" alt="adopt-me logo" />
        <SearchControls
          breed={this.props.breed}
          animal={this.state.animal}
          changeBreed={this.changeBreed}
          changeAnimal={this.changeAnimal}
        />
        {this.state.pets.map(pet => <Pet key={pet.id} pet={pet} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { breed: state.breed };
};

const connectToProps = connect(mapStateToProps);
const ConnectedApp = connectToProps(App);
export default ConnectedApp;
