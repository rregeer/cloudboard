import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import { Style } from 'radium'
import createLogger from 'redux-logger';

import collections from '../etc/sound-collections.json'
import db from './db'
import { normalizeSounds } from './helpers'
import Cloudboard from './components/cloudboard'
import queueReducer from './reducer';
import baseStyles from './styles/base'

import SoundEventRepository from './sound-event-repository'
import createQueueMiddleware from './middleware/queue-middleware'
import playerMiddleware from './middleware/player-middleware'

const soundEventRepository = new SoundEventRepository(db)
const sounds = normalizeSounds(collections)
const queueMiddleware = createQueueMiddleware(soundEventRepository, sounds)

let middlewares = [playerMiddleware, queueMiddleware]
const reducer = combineReducers({
  queue: queueReducer,
  routing: routerReducer,
  collections: () => collections,
  sounds: () => sounds
})

if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, createLogger()]
}

const store = createStore(reducer, applyMiddleware(...middlewares))
const history = syncHistoryWithStore(browserHistory, store)
const rootEl = document.getElementById('root')

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Cloudboard}/>
      </Router>
    </Provider>
    <Style rules={baseStyles}/>
  </div>,
  rootEl
)
