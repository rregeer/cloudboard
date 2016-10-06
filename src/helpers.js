import { letterIndex } from './constants'

export function normalizeSounds(collections) {
  return collections.reduce((allSounds, { sounds, name: collection, key: collectionKey }) => {
    const collectionSounds = sounds.map((sound, index) => ({
      ...sound,
      collection,
      collectionKey,
      key: letterIndex[index]
    }))
    return [...allSounds, ...collectionSounds]
  }, [])
}

export function addKeys(collections) {
  return collections.map((collection, index) => ({
    ...collection,
    sounds: addKeysToSounds(collection.sounds),
    key: String(index + 1)
  }))
}

function addKeysToSounds(sounds) {
  return sounds.map((sound, index) => ({
    ...sound,
    key: letterIndex[index]
  }))
}

export function throttleAction(action, threshhold = 2000) {
  let last

  return function run(...args) {
    const now = Number(new Date())
    if (last && now < last + threshhold) {
      return {
        ...action(...args),
        type: 'IGNORE'
      }
    }

    last = now
    return action(...args)
  }
}
