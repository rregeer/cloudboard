import React from 'react'
import Header from './header'

import { headerHeight, defaultSpacing } from '../styles/variables'
import { add } from '../styles/helpers'

export default function Cloudboard({ children }) {
  return (
    <div style={styles.cloudboard}>
      <Header/>
      {children}
    </div>
  )
}

const styles = {
  cloudboard: {
    paddingTop: add(headerHeight, defaultSpacing)
  }
}
