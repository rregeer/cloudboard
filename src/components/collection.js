import React, { PropTypes } from 'react'
import Sound from './sound'

import '../styles/collection.scss'

export default function Collection({ title, name, collectionKey, pressed, sounds, queue, index }) {
  return (
    <div className="collection">
      <h2 className="collection__title">
        {title}
        <span className={'collection__key' + (pressed ? ' collection__key--pressed' : '')}>
          {collectionKey}
        </span>
      </h2>
      {sounds.map(sound =>
        <Sound
          {...sound}
          queue={queue}
          key={sound.name}
          soundKey={sound.key}
          collection={name}
          collectionPressed={pressed}
          collectionIndex={index}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  collectionKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  queue: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired
}
