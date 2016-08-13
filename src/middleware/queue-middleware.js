import { play } from '../actions'

export default function createQueueMiddleware(soundEventRepository, sounds) {
  return ({ dispatch }) => {
    soundEventRepository.listenForChanges(event => {
      const { name, title } = sounds.find(sound => sound.name = event.name);
      dispatch(play(name, title))
    })

    return next => action => {
      if (action.type === 'QUEUE') {
        soundEventRepository.pushToQueue(action.name)
      }

      next(action);
    }
  }
}
