import React, { PropTypes } from 'react'
import Sound from './sound';

export default function Board({ title, sounds, playSound }) {
  return (
    <div className="board">
      <h2>{title}</h2>
      {sounds.map(({ title, name }) =>
        <Sound
          title={title}
          name={name}
          play={playSound}
          key={name}
        />
      )}
    </div>
  )
}

Board.propTypes = {
  title: PropTypes.string,
  sounds: PropTypes.array
}
