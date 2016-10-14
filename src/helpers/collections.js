import { COLLAPSED_COLLECTIONS_STORAGE_KEY, letterIndex } from '../constants'

export function getSoundsAndCollectionsFromRawConfig(rawCollections) {
  const collections = addKeysAndState(rawCollections)
  return {
    collections,
    sounds: normalizeSounds(collections)
  }
}

export function getPlayingSound(sounds, queue, collections) {
  const playing = queue[queue.length - 1]

  if (!playing) {
    return null
  }

  const { title: sound } = sounds.find(s => s.name === playing.sound) || {}
  const { title: collection } = collections.find(c => c.name === playing.collection) || {}

  return { sound, collection }
}

export function markPressed(collections, collectionKey, soundKey, secondaryMode) {
  return collections.map(collection => {
    const pressed = collection.key === collectionKey
    return {
      ...collection,
      pressed,
      sounds: markPressedSounds(collection.sounds, soundKey, secondaryMode, pressed)
    }
  })
}

function markPressedSounds(sounds, soundKey, secondaryMode, collectionPressed) {
  return sounds.map(sound => ({
    ...sound,
    pressed:
      collectionPressed &&
      sound.key === soundKey &&
      secondaryMode === sound.isSecondary
  }))
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

function getCollapsedCollections() {
  if (Modernizr.localstorage) {
    const storedCollapsedCollections = localStorage.getItem(COLLAPSED_COLLECTIONS_STORAGE_KEY)
    return storedCollapsedCollections ? JSON.parse(storedCollapsedCollections) : []
  }

  return []
}
