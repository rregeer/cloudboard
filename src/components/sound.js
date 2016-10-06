import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({
  title, name, queue, soundKey, pressed, collection, collectionIndex, collectionPressed
}) {
  return (
    <button
      className={'sound sound--' + collectionIndex + (pressed ? ' sound--pressed' : '')}
      onClick={() => queue(name, collection)}
    >
      {title}
      {
        collectionPressed &&
        soundKey &&
        <span className="sound__key">{soundKey}</span>
      }
    </button>
  )
}

Sound.propTypes = {
  collection: PropTypes.string.isRequired,
  collectionIndex: PropTypes.number.isRequired,
  collectionPressed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  queue: PropTypes.func.isRequired,
  soundKey: PropTypes.string,
  title: PropTypes.string.isRequired
}
