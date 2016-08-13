import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import Cloudboard from './components/cloudboard'
import { boards } from '../sounds.json'
import reducer from './reducer';
import playerMiddleware from './player-middleware'

const store = createStore(reducer, applyMiddleware(playerMiddleware));
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Cloudboard boards={boards}/>
  </Provider>,
  rootEl
)
