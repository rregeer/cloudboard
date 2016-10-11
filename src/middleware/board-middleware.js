import { changeBoard } from '../actions/board-actions'

export default function boardMiddleware({ dispatch }) {
  return next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
      handleLocationChange(action, dispatch)
    }

    next(action)
  }
}

function handleLocationChange(action, dispatch) {
  const nextBoard = getBoardFromPathname(action.payload.pathname) || null
  dispatch(changeBoard(nextBoard))
}

function getBoardFromPathname(pathname) {
  return pathname.slice(1, pathname.length)
}
