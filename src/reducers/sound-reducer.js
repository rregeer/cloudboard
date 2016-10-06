import { mapReducers } from 'redux-map-reducers'
import { PLAY, STOPPED } from '../constants'

const reducerMap = {
  [PLAY]: playSound,
  [STOPPED]: stoppedSound
}

function playSound(state, { sound, collection, id }) {
  return [...state, { sound, collection, id }]
}

function stoppedSound(state, { id }) {
  return state.filter(item => item.id !== id)
}

export default mapReducers(reducerMap, [])
