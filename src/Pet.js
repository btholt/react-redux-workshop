import React from 'react'

const Pet = React.createClass({
  render () {
    const photos = this.props.pet.media ? this.props.pet.media.photos.photo.filter((photo) => {
      return photo['@size'] === 'pn'
    }) : []

    const description = this.props.pet.description ? this.props.pet.description.substring(0, 150) : ''

    return (
      <div className='pet'>
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
          <p>{description}</p>
        </ul>
      </div>
    )
  }
})

export default Pet