import React, { PropTypes } from 'react'
import Sound from './sound'

import '../styles/collection.scss'

export default function Collection({ title, name: collectionName, sounds, queue, index }) {
  return (
    <div className="collection">
      <h2 className="collection--title">
        {title}
      </h2>
      {sounds.map(({ title: soundTitle, name }) =>
        <Sound
          title={soundTitle}
          name={name}
          queue={queue}
          key={name}
          collection={collectionName}
          collectionIndex={index}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired
}
