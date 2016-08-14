import React, { PropTypes } from 'react'
import Header from './header'

import '../styles/cloudboard.scss'

export default function Cloudboard({ children, location }) {
  const board = location.pathname.slice(1, location.pathname.length)
  return (
    <div className="cloudboard">
      <Header board={board}/>
      {children}
    </div>
  )
}

Cloudboard.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}
