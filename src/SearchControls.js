import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBreed, search } from './actionCreators';
import petfinder, { ANIMALS } from './petfinder-client';

const pf = petfinder();

class SearchControls extends Component {
  state = {
    breeds: []
  };
  componentDidMount() {
    this.props.search();
    this.getNewBreeds(this.props.animal);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal);
    }
  }
  getNewBreeds(animal) {
    pf.breed.list({ animal }).then(data => {
      if (data.petfinder.breeds) {
        this.setState({ breeds: data.petfinder.breeds.breed });
      }
    });
  }
  handleAnimalChange = event => {
    this.props.changeAnimal(event.target.value);
  };
  render() {
    const breedSelector = !this.props.animal
      ? null
      : <select value={this.props.breed} onChange={this.props.handleBreedChange}>
          <option value="" />
          {this.state.breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
        </select>;
    return (
      <div className="search">
        <select value={this.props.animal} onChange={this.handleAnimalChange}>
          <option value="" />
          {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
        </select>
        {breedSelector}
      </div>
    );
  }
}

const mapStateToProps = state => ({ breed: state.breed });
const mapDispatchToProps = dispatch => ({
  handleBreedChange(event) {
    dispatch(setBreed(event.target.value));
    dispatch(search());
  },
  search() {
    dispatch(search());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchControls);
