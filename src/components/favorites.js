import React, { PropTypes } from 'react'
import Favorite from './favorite'

import '../styles/collection.scss'

export default function Favorites({ queue, favorites, removeFavorite }) {
  return (
    <div className="collection">
      <h2 className="collection__title collection__title--favorites">
        <i className="collection__title-icon fa fa-star"/> Favorites
      </h2>
      {
        favorites.length === 0 &&
        <p className="collection__favorites-message">
          No favorites yet, click the <i className="fa fa-star"/> next to a sound to add it to your favorites!
        </p>
      }
      {favorites.map(favorite =>
        <Favorite
          {...favorite}
          key={favorite.name}
          queue={queue}
          removeFavorite={removeFavorite}
        />
      )}
    </div>
  )
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    collection: PropTypes.string.isRequired
  })).isRequired,
  queue: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
}
