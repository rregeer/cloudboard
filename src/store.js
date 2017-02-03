import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import rawCollections from '../etc/sound-collections.json'
import { isMobileBrowser as checkIfMobileBrowser } from './helpers/browser'
import { getSoundsAndCollectionsFromRawConfig } from './helpers/collections'
import { getFavorites } from './helpers/favorites'
import * as reducers from './reducers'

import keyEpic from './epics/key-epic'
import collectionEpic from './epics/collection-epic'
import favoritesEpic from './epics/favorites-epic'
import queueEpic from './epics/queue-epic'
import playerEpic from './epics/player-epic'

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

function createMiddlewares(remoteMode, isMobileBrowser) {
  const middlewares = [
    createEpicMiddleware(createRootEpic(isMobileBrowser)),
    routerMiddleware(browserHistory)
  ]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
  }

  return middlewares
}

function createRootEpic(isMobileBrowser) {
  const epics = [queueEpic, playerEpic]

  if (Modernizr.localstorage) {
    epics.push(collectionEpic, favoritesEpic)
  }

  if (!isMobileBrowser) {
    epics.push(keyEpic)
  }

  return combineEpics(...epics)
}

export default ownCreateStore
