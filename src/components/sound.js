import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({ title, name, queue, collection }) {
  return (
    <button className="sound" onClick={() => queue(name, collection)}>
      {title}
    </button>
  )
}

Sound.propTypes = {
  collection: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
