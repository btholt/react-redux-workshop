import React from 'react'
import Pet from './Pet'

const PetList = React.createClass({
  render () {
    let pets
    if (this.props.pets.length > 0) {
      pets = this.props.pets.map((pet) => {
        const isFavorite = this.props.favorites.findIndex((favorite) => {
          return favorite.id === pet.id
        }) >= 0
        return (
          <Pet
            toggleFavorite={this.props.toggleFavorite}
            key={pet.id}
            pet={pet}
            favorite={isFavorite}
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
})

export default PetList