import React, { PropTypes } from 'react'

export default function Sound({ title, name, play }) {
  return (
    <button onClick={() => play(title, name)}>{title}</button>
  )
}

Sound.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  play: PropTypes.func
}
