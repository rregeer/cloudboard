import React, { Component, PropTypes } from 'react'
import t from 'tinycolor2'

import { white, turqoise, blue } from '../styles/colors'
import { headerHeight, defaultSpacing } from '../styles/variables'

function Header () {
  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>Cloudboard</h1>
    </div>
  )
}

export default Header

const styles = {
  header: {
    backgroundColor: white,
    boxShadow: `0 3px 4px ${t(white).darken(5)}`,
    height: headerHeight,
    lineHeight: headerHeight,
    fontSize: '2.4rem',
    padding: `0 ${defaultSpacing}`,
    position: 'fixed',
    top: 0,
    width: '100%'
  },
  headerTitle: {
    color: turqoise,
    background: `-webkit-linear-gradient(${blue}, ${turqoise})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '3.2rem',
    fontFamily: 'Montserrat, sans-serif',
    margin: 0,
    textTransform: 'lowercase'
  }
}
