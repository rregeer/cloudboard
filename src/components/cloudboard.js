import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue } from '../actions'
import Collection from './collection'
import Player from './player'
import Header from './header'

import { headerHeight, defaultSpacing, playerHeight } from '../styles/variables'
import { add } from '../styles/helpers'

@connect(
  ({ queue, sounds, collections }) => ({ playing: queue[0], sounds, collections }),
  dispatch => bindActionCreators({ queue }, dispatch)
)
export default class Cloudboard extends Component {
  getPlayingSong() {
    const { sounds, playing, collections } = this.props

    if (!playing) {
      return null
    }

    const { title: sound } = sounds.find(s => s.name === playing.sound) || {}
    const { title: collection } = collections.find(c => c.name === playing.collection) || {}

    return { sound, collection }
  }

  render() {
    const { queue, collections } = this.props

    return <div style={styles.cloudboard}>
      <Header/>
      <Player playing={this.getPlayingSong()}/>
      <div style={styles.collections}>
        {collections.map(({ sounds, title, name }) =>
          <Collection
            key={title}
            title={title}
            sounds={sounds}
            queue={queue}
            name={name}
          />
        )}
      </div>
    </div>
  }

  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      sounds: PropTypes.array.isRequired
    })).isRequired,
    queue: PropTypes.func.isRequired,
    playing: PropTypes.shape({
      sound: PropTypes.string,
      collection: PropTypes.string
    })
  }
}

const styles = {
  cloudboard: {
    paddingTop: add(headerHeight, defaultSpacing)
  },
  collections: {
    paddingBottom: playerHeight
  }
}
