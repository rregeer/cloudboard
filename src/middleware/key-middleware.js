import { press, release } from '../actions/key-actions'
import { queue } from '../actions/sound-actions'
import { PRESS, SOUND_THROTTLE, keyCodeMap } from '../constants'
import { throttleAction } from '../helpers'

const throttledQueue = throttleAction(queue, SOUND_THROTTLE)

export default function createKeyMiddleware(document) {
  return ({ dispatch, getState }) => {
    document.addEventListener('keydown', event => handleKeyPress(keyCodeMap[event.which], dispatch, getState()))
    document.addEventListener('keyup', event => handleKeyRelease(keyCodeMap[event.which], dispatch))

    return next => action => {
      next(action) // eslint-disable-line callback-return

      if (action.type === PRESS) {
        handleKeyCombinations(getState(), dispatch)
      }
    }
  }
}

function handleKeyPress(key, dispatch, state) {
  if (state.board && state.keys.collectionKey !== key && state.keys.soundKey !== key) {
    dispatch(press(key))
  }
}

function handleKeyRelease(key, dispatch) {
  dispatch(release(key))
}

function handleKeyCombinations({ keys, sounds }, dispatch) {
  const { collectionKey, soundKey, secondaryMode } = keys

  if (collectionKey !== null && soundKey !== null) {
    matchKeyCombinationToSound(dispatch, sounds, collectionKey, soundKey, secondaryMode)
  }
}

function matchKeyCombinationToSound(dispatch, sounds, collectionKey, soundKey, secondaryMode) {
  const matchingSound = findSound(sounds, collectionKey, soundKey, secondaryMode)

  if (matchingSound) {
    dispatch(throttledQueue(matchingSound.name, matchingSound.collection))
  }
}

function findSound(sounds, collectionKey, soundKey, secondaryMode) {
  return sounds.find(sound =>
    sound.collectionKey === collectionKey &&
    sound.key === soundKey &&
    sound.isSecondary === secondaryMode
  )
}
