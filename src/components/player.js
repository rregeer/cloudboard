import React, { PropTypes } from 'react'

import '../styles/player.scss'

export default function Player({ playing, unlock, unlocked }) {
  const icon = playing ? 'volume-up' : 'volume-off'
  return (
    <div className="player">
      <p className="player__message">
        <i
          className={
            'player__icon fa fa-lg fa-' + icon +
            (unlocked ? '' : ' player__icon--locked')
          }
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

          return <span className="player__secondary">
            { unlocked ? 'Pretty quiet in here!' : 'Sound locked by browser.' }
          </span>
        })()}
      </p>
      {!unlocked &&
        <button className="player__unlock" onClick={unlock}>Unlock</button>
      }
    </div>
  )
}

Player.propTypes = {
  playing: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  }),
  unlock: PropTypes.func.isRequired,
  unlocked: PropTypes.bool.isRequired
}
