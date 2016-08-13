import React from 'react'
import ReactDOM from 'react-dom'

import Cloudboard from './cloudboard'
import { boards } from '../sounds.json'

const rootEl = document.getElementById('root')

ReactDOM.render(<Cloudboard boards={boards}/>, rootEl)
