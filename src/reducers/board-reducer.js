import { mapReducers } from 'redux-map-reducers'
import { CHANGE_BOARD } from '../constants'

const reducerMap = {
  [CHANGE_BOARD]: changeBoard
}

function changeBoard(state, { board }) {
  return board
}

export default mapReducers(reducerMap, null)
