import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from './header'
import { version } from '../../package.json'

import '../styles/cloudboard.scss'

function Cloudboard({ children, location, remoteMode }) {
  const board = location.pathname.slice(1, location.pathname.length)
  return (
    <div className={'cloudboard' + (remoteMode ? ' cloudboard--no-player' + '')}>
      <Header board={board}/>
      {children}
      <p className="cloudboard__version">
        <i className="fa fa-copyright"/>
          {'\u00A0'}
        <a
          className="cloudboard__version-link"
          href="http://nielsgerritsen.com"
          target="_blank"
        >
          Niels Gerritsen
        </a>
        {'\u00A0'}2016 - version {version}
      </p>
    </div>
  )
}

Cloudboard.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  remoteMode: PropTypes.bool.isRequired
}

export default Connect(({ remoteMode }) => ({ remoteMode }))(Cloudboard)
