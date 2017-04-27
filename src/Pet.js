import React from 'react';
const MAX_DESCRIPTION_LENGTH = 150;

const Pet = props => {
  const photos = props.pet.media
    ? props.pet.media.photos.photo.filter(photo => {
        return photo['@size'] === 'pn';
      })
    : [];

  const description = props.pet.description || '';

  return (
    <div className="pet">
      <div>
        {photos.map((photo, index) => (
          <img key={photo.value} alt={`${props.pet.name} number ${index + 1}`} src={photo.value} />
        ))}
      </div>
    </div>
  );
};

export default Pet;
