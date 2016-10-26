import { stopped, play } from '../actions/sound-actions'
import { PLAY } from '../constants'
import { SERVER_PLAY } from '../../server/constants'
import playAudio from '../audio-player'

export default function createPlayerMiddleware(socket) {
  return ({ dispatch, getState }) => {
    socket.on(SERVER_PLAY, event => {
      handlePlay(dispatch, getState(), event)
    })

    return next => action => {
      if (action.type === PLAY) {
        const { id, collection, sound } = action
        playSound(sound, id, collection, dispatch)
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

function playSound(sound, id, collection, dispatch) {
  const url = `/sounds/${collection}/${sound}.mp3`

  playAudio(url, () => {
    dispatch(stopped(id))
  })
}
