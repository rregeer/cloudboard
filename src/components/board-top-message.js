import React, { PropTypes } from 'react'

import '../styles/board-top-message.scss'

function BoardTopMessage({ localMode }) {
  const icon = localMode ? 'map-marker' : 'cloud'
  const type = localMode ? 'local' : 'remote'
  const message = localMode ? 'Local mode' : 'Remote mode'

  return (
    <p className={'board-top-message board-top-message--' + type}>
      <i className={'fa board-top-message__icon fa-' + icon}/>
      {message}
    </p>
  )
}

BoardTopMessage.propTypes = {
  localMode: PropTypes.bool.isRequired
}

export default BoardTopMessage
