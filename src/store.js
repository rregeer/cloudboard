/* eslint-disable max-statements */
/* global Modernizr */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import createLogger from 'redux-logger'

import socket from './socket'
import rawCollections from '../etc/sound-collections.json'
import { normalizeSounds, addKeys, isMobileBrowser as checkIfMobileBrowser } from './helpers'

import boardReducer from './reducers/board-reducer'
import soundReducer from './reducers/sound-reducer'
import keyReducer from './reducers//key-reducer'

import createQueueMiddleware from './middleware/queue-middleware'
import createPlayerMiddleware from './middleware/player-middleware'
import createKeyMiddleware from './middleware/key-middleware'

function ownCreateStore(callback) {
  Modernizr.on('videoautoplay', hasAutoPlay => {
    const isMobileBrowser = checkIfMobileBrowser()
    const remoteMode = isMobileBrowser || !hasAutoPlay
    const reducer = createReducer(remoteMode, isMobileBrowser)
    const middlewares = createMiddlewares(remoteMode, isMobileBrowser)
    const store = createStore(reducer, applyMiddleware(...middlewares))

    return callback(store)
  })
}

function createReducer(remoteMode, isMobileBrowser) {
  const collections = addKeys(rawCollections)
  const sounds = normalizeSounds(collections)

  combineReducers({
    queue: soundReducer,
    keys: keyReducer,
    routing: routerReducer,
    board: boardReducer,
    remoteMode: () => remoteMode,
    collections: () => collections,
    sounds: () => sounds,
    isMobileBrowser: () => isMobileBrowser
  })
}

function createMiddlewares(remoteMode, isMobileBrowser) {
  const middlewares = [
    createQueueMiddleware(socket),
    routerMiddleware(hashHistory)
  ]

  if (!remoteMode) {
    middlewares.push(createPlayerMiddleware(socket))
  }

  if (!isMobileBrowser) {
    middlewares.push(createKeyMiddleware(document))
  }

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
  }

  return middlewares
}

export default ownCreateStore
