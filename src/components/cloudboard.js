import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { play } from '../actions'
import Board from './board'

@connect(
  state => state,
  dispatch => bindActionCreators({ play }, dispatch)
)
export default class Cloudboard extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      sounds: PropTypes.array
    })),
    play: PropTypes.func
  }

  render() {
    const { play, boards } = this.props
    return <div className="container">
      <h1>Cloudboard</h1>
      {boards.map(({ sounds, title }) =>
        <Board
          key={title}
          title={title}
          sounds={sounds}
          play={play}
        />
      )}
    </div>
  }
}
