import React, { PropTypes } from 'react'
import Sound from './sound';
import t from 'tinycolor2'

import { defaultSpacing } from '../styles/variables'
import { white, dark } from '../styles/colors'

export default function Collection({ title, name, sounds, queue }) {
  return (
    <div style={styles.collection}>
      <h2 style={styles.title}>
        {title}
      </h2>
      {sounds.map(({ title, name }) =>
        <Sound
          title={title}
          name={name}
          queue={queue}
          key={name}
        />
      )}
    </div>
  )
}

Collection.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sounds: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  queue: PropTypes.func.isRequired
}

const styles = {
  collection: {
    backgroundColor: t(white).setAlpha(0.8),
    marginBottom: '3rem',
    padding: `2.4rem ${defaultSpacing} 2rem`
  },
  title: {
    color: dark,
    fontSize: '2.2rem',
    fontWeight: 'normal',
    margin: '0 0 1.6rem 0'
  }
}
