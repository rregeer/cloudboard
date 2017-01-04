import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({ // eslint-disable-line complexity
  addFavorite,
  collection,
  collectionIndex,
  collectionPressed,
  favorite,
  isFavorite,
  isSecondary,
  name,
  queue,
  removeFavorite,
  soundKey,
  pressed,
  secondaryMode,
  title
}) {
  return (
    <button
      className={
        'sound sound--' + collectionIndex +
        (pressed ? ' sound--pressed' : '') +
        (favorite ? ' sound--favorite' : '')
      }
      onClick={() => queue(name, collection)}
    >
      {title}
      {
        !isFavorite && !favorite &&
        <i
          className="sound__favorite-star fa fa-star"
          onClick={event => {
            event.stopPropagation()
            addFavorite(collection, name)
          }}
        />
      }
      {
        favorite &&
        <i
          className="sound__favorite-star sound__favorite-star--remove fa fa-times"
          onClick={event => {
            event.stopPropagation()
            removeFavorite(collection, name)
          }}
        />
      }
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
  addFavorite: PropTypes.func,
  collection: PropTypes.string.isRequired,
  collectionIndex: PropTypes.number.isRequired,
  collectionPressed: PropTypes.bool.isRequired,
  favorite: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isSecondary: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  queue: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func,
  secondaryMode: PropTypes.bool.isRequired,
  soundKey: PropTypes.string,
  title: PropTypes.string.isRequired
}
