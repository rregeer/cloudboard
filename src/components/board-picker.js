import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import '../styles/board-picker.scss'

const VALIDATION_ERROR = 'Invalid board name, enter a minumum of 3 characters, only use: (a-z, 0-9 \'-\' or \'_\').'

class BoardPicker extends Component {
  constructor(...args) {
    super(...args)
    this.state = { input: '', error: '' }
  }

  handleInput() {
    const input = this.refs.input.value.toLowerCase()
    const error = this.isValidBoardName(input) ? '' : this.state.error

    this.setState({ input, error })
  }

  handleSubmit(e) {
    const input = this.state.input

    e.preventDefault()

    if (!this.isValidBoardName(input)) {
      this.setState({ error: VALIDATION_ERROR })
      return
    }

    this.props.push('/' + input)
  }

  isValidBoardName(input) {
    return (
      input.length > 2 &&
      encodeURIComponent(input).indexOf('%') === -1
    )
  }

  render() {
    const { input, error } = this.state
    const valid = this.isValidBoardName(input)
    return (
      <div className="board-picker">
        <form className="board-picker--form" onSubmit={this.handleSubmit.bind(this)}>
          <label className="board-picker--label">#</label>
          <input
            className="board-picker--input"
            type="text"
            placeholder="Board name"
            ref="input"
            onInput={this.handleInput.bind(this)}
          />
          <button
            type="submit"
            className={'board-picker--button' + (valid ? '' : ' is-disabled')}
          >
            Join board
          </button>
        </form>
        {error && <p className="board-picker--error">{error}</p>}
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
  (dispatch) => bindActionCreators({ push }, dispatch)
)(BoardPicker)
