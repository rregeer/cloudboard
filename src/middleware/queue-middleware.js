import { QUEUE } from '../constants'
import { serverQueue } from '../../server/events'
import shortid from 'shortid'

export default function createQueueMiddleware(socket) {
  return () => {
    return next => action => {
      if (action.type === QUEUE) {
        handleQueue(action, socket)
      }

      next(action)
    }
  }
}

function handleQueue(action, socket) {
  const { collection, sound } = action
  const id = shortid.generate()
  const [event, data] = serverQueue(id, collection, sound)

  socket.emit(event, data)
}
