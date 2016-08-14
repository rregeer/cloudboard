import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'

import { queue } from '../actions'
import Collection from './collection'
import Player from './player'
import Header from './header'

import { headerHeight, defaultSpacing } from '../styles/variables'
import { add } from '../styles/helpers'

@connect(
  ({ queue }) => ({ playing: queue[0] && queue[0].title }),
  dispatch => bindActionCreators({ queue }, dispatch)
)
@Radium
export default class Cloudboard extends Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sounds: PropTypes.array.isRequired
    })).isRequired,
    queue: PropTypes.func.isRequired,
    playing: PropTypes.string
  }

  render() {
    const { queue, collections, playing } = this.props
    return <div style={styles.cloudboard}>
      <Header/>
      <Player playing={playing}/>
      {collections.map(({ sounds, title, name }) =>
        <Collection
          key={title}
          title={title}
          name={name}
          sounds={sounds}
          queue={queue}
        />
      )}
    </div>
  }
}

const styles = {
  cloudboard: {
    paddingTop: add(headerHeight, defaultSpacing)
  }
}
