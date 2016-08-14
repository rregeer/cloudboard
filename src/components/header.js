import React from 'react'
import t from 'tinycolor2'

import { white, blue, purple, text } from '../styles/colors'
import { headerHeight, defaultSpacing } from '../styles/variables'

export default function Header () {
  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>Cloudboard</h1>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: white,
    boxShadow: `0 3px 4px ${t(text).lighten().setAlpha(0.1)}`,
    height: headerHeight,
    lineHeight: headerHeight,
    fontSize: '2.4rem',
    padding: `0 ${defaultSpacing}`,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  headerTitle: {
    color: blue,
    display: 'inline-block',
    background: `linear-gradient(to right, ${blue}, ${purple})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '3.2rem',
    fontFamily: 'Montserrat, sans-serif',
    margin: 0,
    textTransform: 'lowercase'
  }
}
