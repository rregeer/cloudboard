import { play } from '../actions'

export default function createQueueMiddleware(soundEventRepository, sounds) {
  return ({ dispatch }) => {
    soundEventRepository.listenForChanges(({ sound, collection }) => {
      dispatch(play(sound, collection))
    })

    return next => action => {
      if (action.type === 'QUEUE') {
        const { sound, collection } = action
        soundEventRepository.pushToQueue(sound, collection)
      }

      next(action);
    }
  }
}
