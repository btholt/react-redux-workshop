import React from 'react'
const MAX_DESCRIPTION_LENGTH = 150

class Pet extends React.Component {
  render () {
    let photos
    if (this.props.pet.media) {
      photos = this.props.pet.media.photos.photo.filter((photo) => {
        return photo['@size'] === 'pn'
      })
    } else {
      photos = []
    }
    const description = this.props.pet.description || ''

    return (
      <div className='pet'>
        <div>
          {photos.map((photo, index) => {
            return (
              <img src={photo.value} alt={`${this.props.pet.name} number ${index+1}`} key={photo.value} />
            )
          })}
        </div>
        <ul>
          <li>{this.props.pet.name}</li>
          <li>{this.props.pet.animal} : {Array.isArray(this.props.pet.breeds.breed) ? this.props.pet.breeds.breed.join(', ') : this.props.pet.breeds.breed}</li>
          <li>{this.props.pet.age}</li>
          <li>{this.props.pet.contact.city}, {this.props.pet.contact.state}</li>
        </ul>
        <p>{description.substr(0, MAX_DESCRIPTION_LENGTH)}{description.length > MAX_DESCRIPTION_LENGTH ? '…' : ''}</p>
      </div>
    )
  }
}

export default Pet
