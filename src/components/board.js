import React, { PropTypes } from 'react'
import Sound from './sound';

export default function Board({ title, sounds, play }) {
  return (
    <div className="board">
      <h2>{title}</h2>
      {sounds.map(({ title, name }) =>
        <Sound
          title={title}
          name={name}
          play={play}
          key={name}
        />
      )}
    </div>
  )
}

Board.propTypes = {
  title: PropTypes.string,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string
  })),
  play: PropTypes.func
}
