import React, { PropTypes } from 'react'
import Sound from './sound';

export default function Collection({ title, sounds, queue }) {
  return (
    <div className="collection">
      <h2>{title}</h2>
      {sounds.map(({ title, name }) =>
        <Sound
          title={title}
          name={name}
          queue={queue}
          key={name}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  title: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  queue: PropTypes.func.isRequired
}
