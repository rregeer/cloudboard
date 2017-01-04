import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({ addFavorite, collection, isFavorite, name, queue, title }) {
  return (
    <button className="sound" onClick={() => queue(name, collection)}>
      {title}
      {
        !isFavorite &&
        <i
          className="sound__action sound__action--favorite fa fa-star"
          onClick={event => {
            event.stopPropagation()
            addFavorite(collection, name)
          }}
        />
      }
    </button>
  )
}

Sound.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  collection: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
