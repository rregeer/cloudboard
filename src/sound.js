import React, { PropTypes } from 'react'

export default function Sound({ title, name }) {
  return (
    <button onClick={() => playSound(name)}>{title}</button>
  )
}

function playSound(name) {
  const audio = new Audio(`./sounds/${name}.mp3`)
  audio.play()
}

Sound.proptypes = {
  title: PropTypes.string,
  name: PropTypes.string
}
