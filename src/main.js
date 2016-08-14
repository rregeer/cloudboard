import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { Style } from 'radium'

import collections from '../etc/sound-collections.json'
import db from './db'
import { normalizeSounds } from './helpers'
import Cloudboard from './components/cloudboard'
import reducer from './reducer';
import baseStyles from './styles/base'

import SoundEventRepository from './sound-event-repository'
import createQueueMiddleware from './middleware/queue-middleware'
import playerMiddleware from './middleware/player-middleware'

const soundEventRepository = new SoundEventRepository(db)
const sounds = normalizeSounds(collections)
const queueMiddleware = createQueueMiddleware(soundEventRepository, sounds)
const store = createStore(reducer, applyMiddleware(playerMiddleware, queueMiddleware))
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Cloudboard collections={collections} sounds={sounds}/>
      <Style rules={baseStyles}/>
    </div>
  </Provider>,
  rootEl
)
