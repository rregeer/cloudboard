import React, { PropTypes } from 'react'
import Radium from 'radium'

import { blue, turqoise, white } from '../styles/colors'
import t from 'tinycolor2'

function Sound({ title, name, queue }) {
  return (
    <button style={styles.sound} onClick={() => queue(name)}>
      {title}
    </button>
  )
}

export default Radium(Sound)

Sound.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired
}

const styles = {
  sound: {
    backgroundColor: t(blue).lighten(5),
    border: 'none',
    borderRadius: '3px',
    color: white,
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: '0 1rem 1rem 0',
    padding: '0.8rem 1.4rem',
    textTransform: 'uppercase',
    transition: 'background-color 200ms ease',
    ':hover': {
      backgroundColor: t(blue).brighten(9),
      cursor: 'pointer'
    },
    ':focus': {
      backgroundColor: t(blue).brighten(9),
      cursor: 'pointer'
    }
  }
}
