import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'

import { queue } from '../actions'
import Collection from './collection'
import Player from './player'

@connect(
  ({ queue }) => ({ playing: queue[0] && queue[0].title }),
  dispatch => bindActionCreators({ queue }, dispatch)
)
@Radium
export default class Cloudboard extends Component {
  static propTypes = {
    collections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      sounds: PropTypes.array.isRequired
    })).isRequired,
    queue: PropTypes.func.isRequired,
    playing: PropTypes.string
  }

  render() {
    const { queue, collections, playing } = this.props
    return <div className="container">
      <h1>Cloudboard</h1>
      <Player playing={playing}/>
      {collections.map(({ sounds, title }) =>
        <Collection
          key={title}
          title={title}
          sounds={sounds}
          queue={queue}
        />
      )}
    </div>
  }
}

const styles = {

}
