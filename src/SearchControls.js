import React, { Component } from 'react';
import petfinder from './petfinder-client';
const pf = petfinder();

class SearchControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: []
    };

    this.handleBreedChange = this.handleBreedChange.bind(this);
  }
  componentDidMount() {
    this.getNewBreeds(this.props.animal);
  }
  getNewBreeds(animal) {
    pf.breed.list({ animal }).then(data => {
      if (data.petfinder.breeds) {
        this.setState({ breeds: data.petfinder.breeds.breed });
      }
    });
  }
  handleBreedChange(event) {
    this.props.changeBreed(event.target.value);
  }
  render() {
    let breedSelector = null;
    if (this.props.animal) {
      breedSelector = (
        <select value={this.props.breed} onChange={this.handleBreedChange}>
          <option value="" />
          {this.state.breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
        </select>
      );
    }

    return (
      <div className="search">
        {breedSelector}
      </div>
    );
  }
}

export default SearchControls;
