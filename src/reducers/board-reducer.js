import { mapReducers } from 'redux-map-reducers'
import { LOCATION_CHANGE } from '../constants'

const reducerMap = {
  [LOCATION_CHANGE]: determineBoard
}

function determineBoard(state, { payload }) {
  return payload.pathname.slice(1, payload.pathname.length) || null
}

export default mapReducers(reducerMap, null)
