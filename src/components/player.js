import React, { PropTypes } from 'react'
import t from 'tinycolor2'

import { turqoise, blue, white, dark } from '../styles/colors'
import { defaultSpacing, playerHeight } from '../styles/variables'

export default function Player({ playing }) {
  const icon = playing ? 'volume-up' : 'volume-off'
  return (
    <div style={styles.player}>
      <p style={styles.message}>
        <i style={styles.icon} className={'fa fa-lg fa-' + icon}></i>
        {(() => {
          if (playing) {
            return (
              <span>
                {playing.sound || 'Unknown sound'}
                <span style={styles.secondary}>
                  {' - ' + (playing.collection || 'Unknown collection')}
                </span>
              </span>
            )
          }

          return <span style={styles.secondary}>Pretty quiet in here!</span>
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

const styles = {
  player: {
    background: `${blue} linear-gradient(to right, ${blue}, ${turqoise})`,
    height: playerHeight,
    padding: `0 ${defaultSpacing}`,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 11
  },
  message: {
    color: white,
    lineHeight: playerHeight,
    margin: 0,
    textShadow: `0 1px 3px ${t(dark).setAlpha(0.4)}`
  },
  icon: {
    width: '4rem'
  },
  secondary: {
    opacity: 0.6
  }
}
