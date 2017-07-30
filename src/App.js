import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import credentials from './credentials';
import petfinder from './petfinder-client';
import logo from './adopt-me.png';
import Pet from './Pet';
import SearchControls from './SearchControls';
import store from './store';

const pf = petfinder(credentials);

class App extends Component {
  state = {
    animal: 'dog',
    location: 'San Francisco, CA'
  };
  changeAnimal = animal => {
    this.setState({ animal, breed: '' }, () => this.search());
  };
  render() {
    return (
      <div className="app">
        <img src={logo} />
        <SearchControls breed={this.props.breed} animal={this.state.animal} changeAnimal={this.changeAnimal} />
        <div>
          {this.props.pets.map(pet => <Pet key={pet.id} pet={pet} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ breed: state.breed, pets: state.pets });

const ConnectedApp = connect(mapStateToProps)(App);
const ProvidedApp = props => <Provider store={store}><ConnectedApp /></Provider>;

export default ProvidedApp;
