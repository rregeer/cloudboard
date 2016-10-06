import { letterIndex } from './constants'

export function normalizeSounds(collections) {
  return Object.keys(collections)
    .reduce((allSounds, collectionName, collectionIndex) => {
      const { sounds, name } = collections[collectionName]
      const collectionSounds = sounds.map((sound, index) => ({
        ...sound,
        collection: name,
        collectionKey: collectionIndex + 1,
        soundKey: letterIndex[index]
      }))
      return [...allSounds, ...collectionSounds]
    }, [])
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
