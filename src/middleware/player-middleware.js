import { stopped } from '../actions'

const SOUND_TIMEOUT = 10000

export default function playerMiddleware({ dispatch }) {
  return next => action => {
    if (action.type === 'PLAY') {
      const { sound, collection, id } = action
      playSound(sound, collection, () => dispatch(stopped(id)))
    }

    next(action)
  }
}

function playSound(sound, collection, onEnded) {
  const url = `./sounds/${collection}/${sound}.mp3`
  const audio = new Audio(url)
  let ended = false

  audio.onended = () => {
    onEnded()
    ended = true
  }

  setTimeout(() => {
    if (!ended) {
      onEnded()
    }
  }, SOUND_TIMEOUT)

  audio.play()
}
