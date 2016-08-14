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
    backgroundColor: t(white).darken(3),
    color: text,
    fontSize: '1.6rem',
    fontFamily: 'Roboto, open-sans',
    margin: 0
  }
}
