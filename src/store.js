import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger'

import collections from '../etc/sound-collections.json'
import db from './db'
import { normalizeSounds } from './helpers'
import queueReducer from './reducer'
import SoundEventRepository from './sound-event-repository'
import createQueueMiddleware from './middleware/queue-middleware'
import playerMiddleware from './middleware/player-middleware'

const soundEventRepository = new SoundEventRepository(db)
const sounds = normalizeSounds(collections)
const queueMiddleware = createQueueMiddleware(soundEventRepository)

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

export default createStore(reducer, applyMiddleware(...middlewares))
