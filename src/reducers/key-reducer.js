import { mapReducers } from 'redux-map-reducers'
import { letterIndex, RELEASE, PRESS, SECONDARY_KEY } from '../constants'

const reducerMap = {
  [PRESS]: pressKey,
  [RELEASE]: releaseKey
}

const initialState = {
  collectionKey: null,
  soundKey: null,
  secondaryMode: false
}

function pressKey(state, { key }) {
  if (shouldAddAsCollectionKey(state, key)) {
    return {
      ...state,
      collectionKey: key
    }
  }

  if (shouldAddAsSoundKey(state, key)) {
    return {
      ...state,
      soundKey: key
    }
  }

  if (shouldTriggerSecondaryMode(state, key)) {
    return {
      ...state,
      secondaryMode: true
    }
  }

  return state
}

function releaseKey(state, { key }) {
  if (state.collectionKey === key) {
    return {
      ...state,
      collectionKey: null
    }
  }

  if (state.soundKey === key) {
    return {
      ...state,
      soundKey: null
    }
  }

  if (key === SECONDARY_KEY && state.secondaryMode) {
    return {
      ...state,
      secondaryMode: false
    }
  }

  return state
}

function shouldAddAsCollectionKey(state, key) {
  return (
    state.soundKey === null &&
    typeof key === 'number'
  )
}

function shouldAddAsSoundKey(state, key) {
  return (
    state.soundKey === null &&
    letterIndex.includes(key)
  )
}

function shouldTriggerSecondaryMode(state, key) {
  return (
    state.collectionKey !== null &&
    state.soundKey === null &&
    key === SECONDARY_KEY
  )
}

export default mapReducers(reducerMap, initialState)
