import { press, release } from '../actions/key-actions'
import { queue } from '../actions/sound-actions'
import { PRESS, SOUND_THROTTLE } from '../constants'
import { parseKeys, throttleAction } from '../helpers'

const throttledQueue = throttleAction(queue, SOUND_THROTTLE)

export default function createKeyMiddleware(document) {
  return ({ dispatch, getState }) => {
    document.addEventListener('keydown', event => handleKeyPress(event.key, dispatch, getState()))
    document.addEventListener('keyup', event => handleKeyRelease(event.key, dispatch, getState()))

    return next => action => {
      next(action) // eslint-disable-line callback-return

      if (action.type === PRESS) {
        handleKeyCombinations(getState(), dispatch)
      }
    }
  }
}

function handleKeyPress(key, dispatch, state) {
  if (onBoard(state) && !keyIsPressed(state, key)) {
    dispatch(press(key))
  }
}

function handleKeyRelease(key, dispatch, state) {
  if (onBoard(state)) {
    dispatch(release(key))
  }
}

function keyIsPressed(state, key) {
  return state.keys.includes(key)
}

function onBoard({ routing }) {
  return routing.locationBeforeTransitions.pathname !== '/'
}

function handleKeyCombinations({ keys, sounds, routing }, dispatch) {
  if (keys.length !== 2 && keys.length !== 3) {
    return
  }

  const { collectionKey, soundKey, isSecondary } = parseKeys(keys)

  const matchingSound = sounds.find(sound =>
    sound.collectionKey === collectionKey &&
    sound.key === soundKey &&
    sound.isSecondary === isSecondary
  )

  if (matchingSound) {
    dispatch(throttledQueue(matchingSound.name, matchingSound.collection))
  }
}
