import React, { PropTypes } from 'react'

import '../styles/player.scss'

export default function Player({ playing }) {
  const icon = playing ? 'volume-up' : 'volume-off'
  return (
    <div className="player">
      <p className="player--message">
        <i className={'player--icon fa fa-lg fa-' + icon}/>
        {(() => {
          if (playing) {
            return (
              <span>
                {playing.sound || 'Unknown sound'}
                <span className="player--secondary">
                  {' - ' + (playing.collection || 'Unknown collection')}
                </span>
              </span>
            )
          }

          return <span className="player--secondary">Pretty quiet in here!</span>
        })()}
      </p>
    </div>
  )
}

Player.propTypes = {
  playing: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  })
}
