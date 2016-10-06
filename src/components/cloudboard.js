import React, { PropTypes } from 'react'
import Header from './header'
import { version } from '../../package.json'
import '../styles/cloudboard.scss'

export default function Cloudboard({ children, location }) {
  const board = location.pathname.slice(1, location.pathname.length)
  return (
    <div className="cloudboard">
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
  }).isRequired
}
