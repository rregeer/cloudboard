import { QUEUE } from '../constants'
import { play } from '../actions/sound-actions'
import { serverQueue } from '../../server/events'
import shortid from 'shortid'

export default function createQueueMiddleware(socket) {
  return ({ getState, dispatch }) => next => action => {
    const { board, routing } = getState()
    const location = routing ? routing.locationBeforeTransitions : null
    const pathname = location ? location.pathname : ''
    const localMode = pathname.indexOf('/local') === 0

    if (action.type === QUEUE) {
      handleQueue(action, board, socket, dispatch, localMode)
    }

    next(action)
  }
}

function handleQueue(action, board, socket, dispatch, localMode) {
  const { collection, sound } = action
  const id = shortid.generate()
  const { event, data } = serverQueue(id, board, collection, sound)

  if (localMode) {
    dispatch(play(id, collection, sound))
    return
  }

  socket.emit(event, data)
}
