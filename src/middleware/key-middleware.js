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
  if (!validateAmountOfKeys(keys)) {
    return
  }

  const { collectionKey, soundKey, isSecondary } = parseKeys(keys)

  if (validateSecondaryKeyCombination(keys, isSecondary)) {
    return
  }

  matchKeyCombinationToSound(dispatch, sounds, collectionKey, soundKey, isSecondary)
}

function validateSecondaryKeyCombination(keys, isSecondary) {
  return keys.length === 2 && isSecondary
}

function validateAmountOfKeys(keys) {
  return keys.length === 2 || keys.length === 3
}

function matchKeyCombinationToSound(dispatch, sounds, collectionKey, soundKey, isSecondary) {
  const matchingSound = findSound(sounds, collectionKey, soundKey, isSecondary)

  if (matchingSound) {
    dispatch(throttledQueue(matchingSound.name, matchingSound.collection))
  }
}

function findSound(sounds, collectionKey, soundKey, isSecondary) {
  return sounds.find(sound =>
    sound.collectionKey === collectionKey &&
    sound.key === soundKey &&
    sound.isSecondary === isSecondary
  )
}
