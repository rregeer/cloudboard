import { mapReducers } from 'redux-map-reducers'
import { RELEASE, PRESS } from '../constants'

const reducerMap = {
  [PRESS]: pressKey,
  [RELEASE]: releaseKey
}

function pressKey(state, { key }) {
  if (state.includes(key)) {
    return state
  }

  return [...state, key]
}

function releaseKey(state, { key }) {
  return state.filter(k => k !== key)
}

export default mapReducers(reducerMap, [])
