import React, { Component, PropTypes } from 'react'

import Board from './board'

export default class Cloudboard extends Component {
  static proptypes = {
    boards: PropTypes.object
  }

  render() {
    return <div className="container">
      <h1>Cloudboard</h1>
      {this.props.boards.map(({ sounds, title }) =>
        <Board title={title} key={title} sounds={sounds}/>
      )}
    </div>
  }
}
