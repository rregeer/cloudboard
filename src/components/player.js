import React, { PropTypes } from 'react'

export default function Player({ playing }) {
  return (
    <div className="player">
      {playing && (
        <p>Playing: <strong>{playing}</strong></p>
      )}
    </div>
  )
}

Player.propTypes = {
  playing: PropTypes.string
}
