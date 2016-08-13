import React, { PropTypes } from 'react'
import Sound from './sound';

export default function Board({ title, sounds, queue }) {
  return (
    <div className="board">
      <h2>{title}</h2>
      {sounds.map(({ title, name }) =>
        <Sound
          title={title}
          name={name}
          queue={queue}
          key={name}
        />
      )}
    </div>
  )
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  queue: PropTypes.func.isRequired
}
