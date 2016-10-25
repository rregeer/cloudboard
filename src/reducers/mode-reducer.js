import { mapReducers } from 'redux-map-reducers'
import { TOGGLE_LOCAL_MODE } from '../constants'

const initialState = {
  local: false,
  remote: false
}

const reducerMap = {
  [TOGGLE_LOCAL_MODE]: toggleLocalMode
}

function toggleLocalMode(state) {
  return {
    ...state,
    local: !state.local
  }
}

export default mapReducers(reducerMap, initialState)
