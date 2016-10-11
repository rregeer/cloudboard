import { play } from '../actions/sound-actions'
import { QUEUE } from '../constants'
import { serverQueue } from '../../server/events'
import shortid from 'shortid'

export default function createQueueMiddleware(soundEventRepository, socket) {
  return ({ dispatch }) => {
    let listener = null

    return next => action => {
      if (action.type === QUEUE) {
        handleQueue(action, socket, soundEventRepository)
      }

      if (action.type === '@@router/LOCATION_CHANGE') {
        listener = handleLocationChange(listener, action, soundEventRepository, dispatch)
      }

      next(action)
    }
  }
}

function handleQueue(action, socket, soundEventRepository) {
  const { collection, sound } = action
  const id = shortid.generate()
  const [event, data] = serverQueue(id, collection, sound)

  socket.emit(event, data)
  queueSound(action, soundEventRepository)
}

function queueSound(action, soundEventRepository) {
  const { sound, collection } = action
  soundEventRepository.pushToQueue(sound, collection)
}

function handleLocationChange(listener, action, soundEventRepository, dispatch) {
  if (listener) {
    listener.off()
  }

  const { pathname } = action.payload
  const board = pathname.slice(1, pathname.length)

  if (board) {
    changeBoard(board, soundEventRepository, dispatch)
  }

  return listener
}

function changeBoard(board, soundEventRepository, dispatch) {
  soundEventRepository.setBoard(board)
  return soundEventRepository.listenForChanges(({ sound, collection }, id) => {
    dispatch(play(id, collection, sound))
  })
}
