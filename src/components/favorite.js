import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Favorite({ collection, name, queue, removeFavorite, favoriteKey, title }) {
  const hasAction = favoriteKey !== undefined
  return (
    <button
      className={'sound sound--favorite' + (hasAction ? ' sound--has-action' : '')}
      onClick={() => queue(name, collection)}
    >
      {title}
      <i
        className="sound__action sound__action--remove fa fa-times"
        onClick={event => {
          event.stopPropagation()
          removeFavorite(collection, name)
        }}
      />
      {hasAction && <span className="sound__key">{favoriteKey}</span>}
    </button>
  )
}

Favorite.propTypes = {
  collection: PropTypes.string.isRequired,
  favoriteKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
