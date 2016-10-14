import { COLLAPSED_COLLECTIONS_STORAGE_KEY, letterIndex } from './constants'

export function getSoundsAndCollectionsFromRawConfig(rawCollections) {
  const collections = addKeysAndState(rawCollections)
  return {
    collections,
    sounds: normalizeSounds(collections)
  }
}

function addKeysAndState(rawCollections) {
  const collapsedCollections = getCollapsedCollections()
  return rawCollections.map((collection, index) => ({
    ...collection,
    sounds: addKeysToSounds(collection.sounds),
    key: index + 1,
    collapsed: collapsedCollections.includes(collection.name)
  }))
}

function normalizeSounds(collections) {
  return collections.reduce((allSounds, { sounds, name: collection, key: collectionKey }) => {
    const collectionSounds = sounds.map(sound => ({
      ...sound,
      collection,
      collectionKey
    }))
    return [...allSounds, ...collectionSounds]
  }, [])
}

function addKeysToSounds(sounds) {
  return sounds.map((sound, index) => ({
    ...sound,
    key: letterIndex[index] || letterIndex[index - letterIndex.length],
    isSecondary: index >= letterIndex.length
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

export function isMobileBrowser() {
  const ua = navigator.userAgent.toLowerCase()
  return !!ua.match(/ipad|iphone|ipod|android|iemobile/) && !window.MSStream
}

function getCollapsedCollections() {
  if (Modernizr.localstorage) {
    const storedCollapsedCollections = localStorage.getItem(COLLAPSED_COLLECTIONS_STORAGE_KEY)
    return storedCollapsedCollections ? JSON.parse(storedCollapsedCollections) : []
  }

  return []
}
