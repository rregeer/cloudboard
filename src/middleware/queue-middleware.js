import { play } from '../actions'

export default function createQueueMiddleware(soundEventRepository) {
  return ({ dispatch }) => {
    let listener = null

    return next => action => {
      if (action.type === 'QUEUE') {
        const { sound, collection } = action
        soundEventRepository.pushToQueue(sound, collection)
      }

      if (action.type === '@@router/LOCATION_CHANGE') {
        if (listener) {
          listener.off()
        }

        const { pathname } = action.payload
        const board = pathname.slice(1, pathname.length)

        if (board) {
          soundEventRepository.setBoard(board)
          listener = soundEventRepository.listenForChanges(({ sound, collection }, id) => {
            dispatch(play(sound, collection, id))
          })
        }
      }

      next(action)
    }
  }
}
