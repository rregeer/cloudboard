import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import { boards } from '../sounds.json'
import db from './db'
import { extractSoundsFromBoards } from './helpers'
import Cloudboard from './components/cloudboard'
import reducer from './reducer';

import SoundEventRepository from './sound-event-repository'
import createQueueMiddleware from './middleware/queue-middleware'
import playerMiddleware from './middleware/player-middleware'

const soundEventRepository = new SoundEventRepository(db)
const sounds = extractSoundsFromBoards(boards)
const queueMiddleware = createQueueMiddleware(soundEventRepository, sounds)
const store = createStore(reducer, applyMiddleware(playerMiddleware, queueMiddleware))
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Cloudboard boards={boards}/>
  </Provider>,
  rootEl
)
