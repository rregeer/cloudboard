import React, { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import t from 'tinycolor2'

import { text, blue, purple, white } from '../styles/colors'

class BoardPicker extends Component {
  constructor(...args) {
    super(...args)
    this.state = { input: '' }
  }

  onInput() {
    this.setState({ input: this.refs.input.value })
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
      <div style={styles.boardPicker}>
        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Board name"
            ref="input"
            onInput={this.onInput.bind(this)}
          />
          {(() => {
            if (!valid) {
              return <span style={styles.buttonDisabled}>Join board</span>
            }

            return <Link to={'/' + this.state.input} style={styles.button}>Join board</Link>
          })()}

        </div>
        <p style={styles.message}>
          Type a name to join a board,
          if the board does not exist it is automatically created!
        </p>
      </div>
    )
  }
}

export default Radium(BoardPicker) // eslint-disable-line new-cap

const buttonBase = {
  background: `${blue} linear-gradient(to bottom right, ${blue}, ${purple})`,
  border: 'none',
  borderRadius: '3px',
  color: white,
  fontSize: '2.1rem',
  padding: '1.2rem 1.6rem',
  textDecoration: 'none'
}
const buttonHover = {
  cursor: 'pointer',
  opacity: 0.4
}
const styles = {
  boardPicker: {
    textAlign: 'center',
    paddingTop: '10%'
  },
  message: {
    color: t(text).lighten(20),
    lineHeight: '2.2rem'
  },
  form: {
    marginBottom: '3rem'
  },
  input: {
    borderRadius: '3px',
    border: `1px solid ${t(white).darken()}`,
    display: 'inline-block',
    fontSize: '2.1rem',
    marginRight: '1rem',
    padding: '1.2rem 1.4rem',
  },
  button: {
    ...buttonBase,
    ':hover': buttonHover,
    ':focus': buttonHover
  },
  buttonDisabled: {
    ...buttonBase,
    opacity: 0.4
  }
}
