import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'

import { queue } from '../actions'
import Board from './board'
import Player from './player'

@connect(
  ({ queue }) => ({ playing: queue[0] && queue[0].title }),
  dispatch => bindActionCreators({ queue }, dispatch)
)
@Radium
export default class Cloudboard extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      sounds: PropTypes.array.isRequired
    })).isRequired,
    queue: PropTypes.func.isRequired,
    playing: PropTypes.string
  }

  render() {
    const { queue, boards, playing } = this.props
    return <div className="container">
      <h1>Cloudboard</h1>
      <Player playing={playing}/>
      {boards.map(({ sounds, title }) =>
        <Board
          key={title}
          title={title}
          sounds={sounds}
          queue={queue}
        />
      )}
    </div>
  }
}
