import React, { PropTypes } from 'react'

import '../styles/sound.scss'

export default function Sound({ title, name, queue, collection, collectionIndex }) {
  return (
    <button className={'sound alt-' + collectionIndex} onClick={() => queue(name, collection)}>
      {title}
    </button>
  )
}

Sound.propTypes = {
  collection: PropTypes.string.isRequired,
  collectionIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
