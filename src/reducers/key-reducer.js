import { mapReducers } from 'redux-map-reducers'

const reducerMap = {
  PRESS: pressKey,
  RELEASE: releaseKey
}

function pressKey(state, { key }) {
  return [...state, key]
}

function releaseKey(state, { key }) {
  return state.filter(k => k !== key)
}

export default mapReducers(reducerMap, [])
