import { stopped } from '../actions'

export default function playerMiddleware({ dispatch }) {
  return next => action => {
    if (action.type === 'PLAY') {
      playSound(action.name, () => dispatch(stopped()))
    }

    next(action);
  }
}

function playSound(name, onEnded) {
  const url = `./sounds/${name}.mp3`
  const audio = new Audio(url)

  audio.onended = onEnded
  audio.play()
}
