import React, { Component, PropTypes } from 'react'

import Board from './board'
import db from './db';

export default class Cloudboard extends Component {
  static propTypes = {
    boards: PropTypes.array
  }

  playSound(name) {
    const url = `./sounds/${name}.mp3`
    const audio = new Audio()

    audio.play()
    db.ref().push(name)
  }

  render() {
    return <div className="container">
      <h1>Cloudboard</h1>
      {this.props.boards.map(({ sounds, title }) =>
        <Board
          key={title}
          title={title}
          sounds={sounds}
          playSound={this.playSound}
        />
      )}
    </div>
  }
}
