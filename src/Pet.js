import React from 'react'

const Pet = React.createClass({
  handleFavoriteChange () {
    this.props.toggleFavorite(this.props.pet, !this.props.favorite)
  },
  render () {
    const photos = this.props.pet.media ? this.props.pet.media.photos.photo.filter((photo) => {
      return photo['@size'] === 'pn'
    }) : []

    const description = this.props.pet.description ? this.props.pet.description.substring(0, 150) : ''

    return (
      <div className='pet'>
        <input type='checkbox' checked={this.props.favorite} onChange={this.handleFavoriteChange} />
        <div>
          {photos.map((photo, index) => {
            return (
              <img key={photo.value} alt={`${this.props.pet.name} number ${index+1}`} src={photo.value} />
            )
          })}
        </div>
        <ul>
          <li>{this.props.pet.name}</li>
          <li>
            {this.props.pet.animal} : {Array.isArray(this.props.pet.breeds.breed) ? this.props.pet.breeds.breed.join(', ') : this.props.pet.breeds.breed}
          </li>
          <li>{this.props.pet.age}</li>
          <li>{this.props.pet.contact.city}, {this.props.pet.contact.state}</li>
        </ul>
        <p>{description}</p>
      </div>
    )
  }
})

export default Pet