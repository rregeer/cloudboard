import React, { PropTypes } from 'react'

export default function Sound({ title, name, queue }) {
  return (
    <button onClick={() => queue(name)}>{title}</button>
  )
}

Sound.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  queue: PropTypes.func.isRequired
}
