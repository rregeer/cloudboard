import React, { PropTypes } from 'react'
import Radium from 'radium'
import t from 'tinycolor2'

import { blue, turqoise, white } from '../styles/colors'

function Sound({ title, name, queue, collection }) {
  return (
    <button style={styles.sound} onClick={() => queue(name, collection)}>
      {title}
    </button>
  )
}

export default Radium(Sound)

Sound.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired
}

const styles = {
  sound: {
    backgroundColor: blue,
    background: `linear-gradient(to bottom right, ${blue}, ${t(blue).spin(5)})`,
    border: 'none',
    borderRadius: '3px',
    color: white,
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: '0 1rem 1rem 0',
    opacity: 0.8,
    padding: '0.6rem 1.2rem',
    textTransform: 'uppercase',
    transition: 'opacity 200ms ease',
    ':hover': {
      opacity: 1,
      cursor: 'pointer'
    },
    ':focus': {
      opacity: 1,
      cursor: 'pointer'
    }
  }
}
