import { COLLAPSED_COLLECTIONS_STORAGE_KEY, FAVORITES_STORAGE_KEY, letterIndex } from '../constants'

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

export function markStates(collections, collectionKey, soundKey, secondaryMode, favorites) {
  return collections.map(collection => {
    const pressed = collection.key === collectionKey
    return {
      ...collection,
      pressed,
      sounds: markSoundStates(collection.sounds, soundKey, secondaryMode, pressed, favorites, collection)
    }
  })
}

export function enhanceFavorites(favorites, sounds) {
  return favorites.map(favorite => {
    return sounds.find(s => s.name === favorite.sound && s.collection === favorite.collection)
  })
}

export function getFavorites() {
  if (Modernizr.localstorage) {
    const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return favorites ? JSON.parse(favorites) : []
  }

  return []
}

// eslint-disable-next-line max-params
function markSoundStates(sounds, soundKey, secondaryMode, collectionPressed, favorites, collection) {
  return sounds.map(sound => ({
    ...sound,
    isFavorite: !!favorites.find(f => f.sound === sound.name && f.collection === collection.name),
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
