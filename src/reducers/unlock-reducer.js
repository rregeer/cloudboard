import { mapReducers } from 'redux-map-reducers'
import { UNLOCK } from '../constants'

const reducerMap = {
  [UNLOCK]: unlock
}

function unlock() {
  return true
}

export default mapReducers(reducerMap, false)
