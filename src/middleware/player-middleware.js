import { stopped } from '../actions'

export default function playerMiddleware({ dispatch }, sounds) {
  return next => action => {
    if (action.type === 'PLAY') {
      const { sound, collection } = action
      playSound(sound, collection, () => dispatch(stopped()))
    }

    next(action);
  }
}

function playSound(sound, collection, onEnded) {
  const url = `./sounds/${collection}/${sound}.mp3`
  const audio = new Audio(url)

  audio.onended = onEnded
  audio.play()
}
