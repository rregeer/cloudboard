import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'

import socket from './socket'
import rawCollections from '../etc/sound-collections.json'
import { isMobileBrowser as checkIfMobileBrowser } from './helpers/browser'
import { getSoundsAndCollectionsFromRawConfig } from './helpers/collections'
import { getFavorites } from './helpers/favorites'
import * as reducers from './reducers'

import collectionMiddleware from './middleware/collection-middleware'
import favoritesMiddleware from './middleware/favorites-middleware'
import createQueueMiddleware from './middleware/queue-middleware'
import createPlayerMiddleware from './middleware/player-middleware'
import createKeyMiddleware from './middleware/key-middleware'

function ownCreateStore(callback) {
  // eslint-disable-next-line max-statements
  Modernizr.on('videoautoplay', hasAutoPlay => {
    const { collections, sounds } = getSoundsAndCollectionsFromRawConfig(rawCollections)
    const favorites = getFavorites()
    const isMobileBrowser = checkIfMobileBrowser()
    const remoteMode = isMobileBrowser || !hasAutoPlay
    const reducer = createReducer(remoteMode, isMobileBrowser, sounds)
    const middlewares = createMiddlewares(remoteMode, isMobileBrowser)
    const store = createStore(reducer, { collections, remoteMode, favorites }, applyMiddleware(...middlewares))

    return callback(store)
  })
}

function createReducer(remoteMode, isMobileBrowser, sounds) {
  return combineReducers({
    ...reducers,
    routing: routerReducer,
    remoteMode: () => remoteMode,
    sounds: () => sounds,
    isMobileBrowser: () => isMobileBrowser
  })
}

// eslint-disable-next-line max-statements
function createMiddlewares(remoteMode, isMobileBrowser) {
  const middlewares = [
    createQueueMiddleware(socket),
    routerMiddleware(browserHistory),
    createPlayerMiddleware(socket)
  ]

  if (!isMobileBrowser) {
    middlewares.push(createKeyMiddleware(document))
  }

  if (Modernizr.localstorage) {
    middlewares.push(collectionMiddleware, favoritesMiddleware)
  }

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
  }

  return middlewares
}

export default ownCreateStore
