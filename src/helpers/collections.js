import { COLLAPSED_COLLECTIONS_STORAGE_KEY } from '../constants'

export function getSoundsAndCollectionsFromRawConfig(rawCollections) {
  const collections = markCollapsed(rawCollections)
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

export function markFavoriteSounds(collections, favorites) {
  return collections.map(collection => {
    return {
      ...collection,
      sounds: markFavorites(collection.sounds, favorites, collection)
    }
  })
}

function markFavorites(sounds, favorites, collection) {
  return sounds.map(sound => ({
    ...sound,
    isFavorite: !!favorites.find(f => f.sound === sound.name && f.collection === collection.name)
  }))
}

function markCollapsed(rawCollections) {
  const collapsedCollections = getCollapsedCollections()
  return rawCollections.map(collection => ({
    ...collection,
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

function getCollapsedCollections() {
  if (Modernizr.localstorage) {
    const storedCollapsedCollections = localStorage.getItem(COLLAPSED_COLLECTIONS_STORAGE_KEY)
    return storedCollapsedCollections ? JSON.parse(storedCollapsedCollections) : []
  }

  return []
}
