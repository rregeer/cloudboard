import { stopped, play } from '../actions/sound-actions'
import { PLAY } from '../constants'
import { SERVER_PLAY } from '../../server/constants'

const SOUND_TIMEOUT = 10000

export default function createPlayerMiddleware(socket) {
  return ({ dispatch, getState }) => {
    socket.on(SERVER_PLAY, event => {
      handlePlay(dispatch, getState(), event)
    })

    return next => action => {
      if (action.type === PLAY) {
        const { id, collection, sound } = action
        playSound(sound, collection, () => dispatch(stopped(id)))
      }

      next(action)
    }
  }
}

function handlePlay(dispatch, state, event) {
  const { id, collection, sound, board } = event

  if (board === state.board) {
    dispatch(play(id, collection, sound))
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
