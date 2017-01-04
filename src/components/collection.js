import React, { PropTypes } from 'react'
import Sound from './sound'

import '../styles/collection.scss'

export default function Collection({ addFavorite, collapsed, name, queue, sounds, title, toggleCollection }) {
  return (
    <div className="collection">
      <h2
        className={'collection__title' + (collapsed ? ' collection__title--collapsed' : '')}
        onClick={() => toggleCollection(name)}
      >
        {title}
      </h2>
      {!collapsed && sounds.map(sound =>
        <Sound
          {...sound}
          addFavorite={addFavorite}
          queue={queue}
          key={sound.name}
          collection={name}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
  toggleCollection: PropTypes.func.isRequired
}
