import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import '../styles/board-picker.scss'

const VALIDATION_ERROR = 'Invalid name, enter a minumum of 3 characters, only use: (a-z, 0-9 \'-\' or \'_\').'

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

    this.props.push('/board/' + input)
  }

  handleLocalMode() {
    this.props.push('/local')
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
        <form className="board-picker__form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="board-picker__input"
            type="text"
            placeholder="Board name"
            ref="input"
            onInput={this.handleInput.bind(this)}
          />
          <button
            type="submit"
            className={'board-picker__button' + (valid ? '' : ' is-disabled')}
          >
            Join board
          </button>
        </form>
        {error && <p className="board-picker__error">{error}</p>}
        <p className="board-picker__message">
          Type a board name, then make sure your friends join the same board.
        </p>

        <p className="board-picker__message">
          Or use the board without friends:
        </p>

        <button
          type="button"
          className="board-picker__button board-picker__button--local"
          onClick={this.handleLocalMode.bind(this)}
        >
          Local mode
        </button>
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
