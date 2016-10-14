import React, { PropTypes } from 'react'
import Sound from './sound'

import '../styles/collection.scss'

export default function Collection({
  collectionKey,
  collapsed,
  index,
  isMobileBrowser,
  name,
  pressed,
  queue,
  secondaryMode,
  sounds,
  title,
  toggleCollection
}) {
  return (
    <div className="collection">
      <h2
        className={'collection__title' + (collapsed ? ' collection__title--collapsed' : '')}
        onClick={() => toggleCollection(name)}
      >
        {title}
        {
          !isMobileBrowser &&
          <span className={'collection__key' + (pressed ? ' collection__key--pressed' : '')}>
            {collectionKey}
          </span>
        }
        {
          !isMobileBrowser &&
          <span className={'collection__help' + (pressed ? ' collection__help--active' : '')}>
            Press <strong>Ctrl + KEY</strong> to trigger <span className="collection__help-secondary-tag">
              secondary
            </span> keys
          </span>
        }
      </h2>
      {!collapsed && sounds.map(sound =>
        <Sound
          {...sound}
          queue={queue}
          key={sound.name}
          soundKey={sound.key}
          collection={name}
          collectionPressed={pressed}
          collectionIndex={index}
          secondaryMode={secondaryMode}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  collectionKey: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isMobileBrowser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  queue: PropTypes.func.isRequired,
  secondaryMode: PropTypes.bool.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
  toggleCollection: PropTypes.func.isRequired
}
