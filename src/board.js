import React, { PropTypes } from 'react'
import Sound from './sound';

export default function Board({ title, sounds }) {
  return (
    <div className="board">
      <h2>{title}</h2>
      {sounds.map(({ title, name }) =>
        <Sound title={title} name={name} key={name}/>
      )}
    </div>
  )
}

Board.proptypes = {
  title: PropTypes.string,
  sounds: PropTypes.array
}
