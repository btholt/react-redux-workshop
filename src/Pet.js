import React, { Component } from 'react';

const MAX_DESCRIPTION_LENGTH = 150;

const Pet = props => {
  const photos = props.pet.media ? props.pet.media.photos.photo.filter(photo => photo['@size'] === 'pn') : [];
  const description = props.pet.description || '';

  return (
    <div className="pet">
      <div>
        {photos.map((photo, index) =>
          <img key={photo.value} src={photo.value} alt={`${props.pet.name} number ${index + 1}`} />
        )}
      </div>
      <ul>
        <li>{props.pet.name}</li>
        <li>
          {props.pet.animal} :
          {' '}{Array.isArray(props.pet.breeds.breed) ? props.pet.breeds.breed.join(', ') : props.pet.breeds.breed}
        </li>
        <li>
          {props.pet.age}
        </li>
        <li>
          {props.pet.contact.city}, {props.pet.contact.state}
        </li>
      </ul>
      <p>
        {description.substring(0, MAX_DESCRIPTION_LENGTH)}{description.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}
      </p>
    </div>
  );
};

export default Pet;
