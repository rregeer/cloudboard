import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import createLogger from 'redux-logger'

import collections from '../etc/sound-collections.json'
import db from './db'
import { normalizeSounds } from './helpers'

import soundReducer from './reducers/sound-reducer'
import keyReducer from './reducers//key-reducer'

import SoundEventRepository from './sound-event-repository'
import createQueueMiddleware from './middleware/queue-middleware'
import playerMiddleware from './middleware/player-middleware'
import createKeyMiddleware from './middleware/key-middleware'

const soundEventRepository = new SoundEventRepository(db)
const sounds = normalizeSounds(collections)
const queueMiddleware = createQueueMiddleware(soundEventRepository)

const reducer = combineReducers({
  queue: soundReducer,
  keys: keyReducer,
  routing: routerReducer,
  collections: () => collections,
  sounds: () => sounds
})

function createMiddlewares() {
  const productionMiddlewares = [
    playerMiddleware,
    queueMiddleware,
    routerMiddleware(hashHistory),
    createKeyMiddleware(document)
  ]

  const developmentMiddlewares = [createLogger()]

  if (process.env.NODE_ENV === 'development') {
    return [...productionMiddlewares, ...developmentMiddlewares]
  }

  return productionMiddlewares
}

export default createStore(reducer, applyMiddleware(...createMiddlewares()))
