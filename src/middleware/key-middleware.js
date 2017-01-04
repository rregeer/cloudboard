import { queue } from '../actions/sound-actions'
import { SOUND_THROTTLE, keyCodeMap, favoriteKeyIndex } from '../constants'
import { throttleAction } from '../helpers/actions'

const throttledQueue = throttleAction(queue, SOUND_THROTTLE)

export default function createKeyMiddleware(document) {
  return ({ dispatch, getState }) => {
    document.addEventListener('keyup', event => handleKeyRelease(keyCodeMap[event.which], dispatch, getState()))
    return next => action => next(action)
  }
}

function handleKeyRelease(key, dispatch, { favorites }) {
  const favoriteIndex = favoriteKeyIndex.indexOf(key)
  const favorite = favorites[favoriteIndex]

  if (favorite) {
    dispatch(throttledQueue(favorite.sound, favorite.collection))
  }
}
