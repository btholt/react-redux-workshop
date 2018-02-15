import React from 'react'
import { connect } from 'react-redux'
import Pet from './Pet'

class PetList extends React.Component {
  render() {
    let petList = this.props.isFavorites ? this.props.favorites : this.props.pets
    let pets
    if (petList.length > 0) {
      pets = petList.map((pet) => {
        const isFavorite = this.props.favorites.findIndex((favorite) => favorite.id === pet.id) > -1
        return (
          <Pet
            favorite={isFavorite}
            key={pet.id}
            pet={pet}
          />
        )
      })
    } else {
      pets = <h2>list is empty</h2>
    }
    return (
      <div className='petlist'>
        <h1>{this.props.title}</h1>
        <div>
          {pets}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    favorites: state.favorites,
    pets: state.pets
  }
}

export default connect(mapStateToProps)(PetList)