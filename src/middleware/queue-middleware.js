import { QUEUE } from '../constants'
import { serverQueue } from '../../server/events'
import shortid from 'shortid'

export default function createQueueMiddleware(socket) {
  return ({ getState }) => next => action => {
    const { board } = getState()

    if (action.type === QUEUE) {
      handleQueue(action, board, socket)
    }

    next(action)
  }
}

function handleQueue(action, board, socket) {
  const { collection, sound } = action
  const id = shortid.generate()
  const { event, data } = serverQueue(id, board, collection, sound)

  socket.emit(event, data)
}
