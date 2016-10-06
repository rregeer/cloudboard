import { mapReducers } from 'redux-map-reducers'

const reducerMap = {
  PLAY: playSound,
  STOPPED: stoppedSound
}

function playSound(state, { sound, collection, id }) {
  return [...state, { sound, collection, id }]
}

function stoppedSound(state, { id }) {
  return state.filter(item => item.id !== id)
}

export default mapReducers(reducerMap, [])
