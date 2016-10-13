import React, { PropTypes } from 'react'

import '../styles/player.scss'

export default function Player({ playing }) {
  const icon = playing ? 'volume-up' : 'volume-off'

  return (
    <div className="player">
      <p className="player__message">
        <i
          className={'player__icon fa fa-lg fa-' + icon}
        />
        {(() => {
          if (playing) {
            return (
              <span>
                {playing.sound || 'Unknown sound'}
                <span className="player__secondary">
                  {' - ' + (playing.collection || 'Unknown collection')}
                </span>
              </span>
            )
          }

          return <span className="player__secondary">Much quiet in here!</span>
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
