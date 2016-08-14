import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { queue as queueAction } from '../actions'
import Collection from './collection'
import Player from './player'

class Board extends Component {
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
    return (
      <div>
        <Player playing={this.getPlayingSong()}/>
        <div className="board--collections">
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
    )
  }
}

export default connect(
  ({ queue, sounds, collections }) => ({ playing: queue[0], sounds, collections }),
  dispatch => bindActionCreators({ queue: queueAction }, dispatch)
)(Board)

Board.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    sounds: PropTypes.array.isRequired
  })).isRequired,
  playing: PropTypes.shape({
    sound: PropTypes.string,
    collection: PropTypes.string
  }),
  queue: PropTypes.func.isRequired,
  sounds: PropTypes.array
}
