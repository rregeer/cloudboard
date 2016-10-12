import { stopped, play } from '../actions/sound-actions'
import { PLAY, UNLOCK } from '../constants'
import { SERVER_PLAY } from '../../server/constants'

export default function createPlayerMiddleware(socket, audioPlayer) {
  return ({ dispatch, getState }) => {
    socket.on(SERVER_PLAY, event => {
      handlePlay(dispatch, getState(), event)
    })

    return next => action => {
      if (action.type === PLAY) {
        const { id, collection, sound } = action
        playSound(sound, id, collection, audioPlayer, dispatch)
      }

      if (action.type === UNLOCK) {
        audioPlayer.unlock()
      }

      next(action)
    }
  }
}

function handlePlay(dispatch, state, event) {
  const { id, collection, sound, board } = event

  if (board === state.board && state.unlocked) {
    dispatch(play(id, collection, sound))
  }
}

function playSound(sound, id, collection, audioPlayer, dispatch) {
  const url = `./sounds/${collection}/${sound}.mp3`

  audioPlayer.play(url, () => {
    dispatch(stopped(id))
  })
}
