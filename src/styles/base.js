import t from 'tinycolor2'
import { text, white } from './colors'

export default {
  html: {
    fontSize: '62.5%'
  },
  '*, *:after, *:before': {
    boxSizing: 'border-box'
  },
  body: {
    color: text,
    fontSize: '1.6rem',
    fontFamily: 'Roboto, sans-serif',
    margin: 0
  }
}
