import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({
  title, name, queue, soundKey, pressed, isSecondary, secondaryMode, collection, collectionIndex, collectionPressed
}) {
  return (
    <button
      className={'sound sound--' + collectionIndex + (pressed ? ' sound--pressed' : '')}
      onClick={() => queue(name, collection)}
    >
      {title}
      <span
        className={
          'sound__key' +
          (collectionPressed ? ' sound__key--active' : '') +
          (secondaryMode === isSecondary ? ' sound__key--is-option' : '') +
          (isSecondary ? ' sound__key--secondary' : '')
        }
      >
        {soundKey}
      </span>
    </button>
  )
}

Sound.propTypes = {
  collection: PropTypes.string.isRequired,
  collectionIndex: PropTypes.number.isRequired,
  collectionPressed: PropTypes.bool.isRequired,
  isSecondary: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  queue: PropTypes.func.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  soundKey: PropTypes.string,
  title: PropTypes.string.isRequired
}
