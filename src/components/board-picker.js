import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import '../styles/board-picker.scss'

class BoardPicker extends Component {
  constructor(...args) {
    super(...args)
    this.state = { input: '' }
  }

  handleInput() {
    this.setState({ input: this.refs.input.value.toLowerCase() })
  }

  handleKeyPress(e) {
    const input = this.state.input
    if (e.key === 'Enter' && this.isValidBoardName(input)) {
      this.props.push('/' + input)
    }
  }

  isValidBoardName(input) {
    return (
      input.length > 3 &&
      encodeURIComponent(input).indexOf('%') === -1
    )
  }

  render() {
    const { input } = this.state
    const valid = this.isValidBoardName(input)
    return (
      <div className="board-picker">
        <div className="board-picker--form">
          <label className="board-picker--label">#</label>
          <input
            className="board-picker--input"
            type="text"
            placeholder="Board name"
            ref="input"
            onKeyPress={this.handleKeyPress.bind(this)}
            onInput={this.handleInput.bind(this)}
          />
          {(() => {
            if (!valid) {
              return <span className="board-picker--button is-disabled">Join board</span>
            }

            return <Link to={'/' + this.state.input} className="board-picker--button">Join board</Link>
          })()}

        </div>
        <p className="board-picker--message">
          Type a name to join a board,
          if the board does not exist it is automatically created!
        </p>
      </div>
    )
  }
}

BoardPicker.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators({ push }, dispatch)
)(BoardPicker)
