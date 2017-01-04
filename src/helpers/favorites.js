import { FAVORITES_STORAGE_KEY, favoriteKeyIndex } from '../constants'

export function enhanceFavorites(favorites, sounds) {
  return favorites.map((favorite, index) => {
    return {
      ...sounds.find(s => s.name === favorite.sound && s.collection === favorite.collection),
      favoriteKey: favoriteKeyIndex[index]
    }
  })
}

export function getFavorites() {
  if (Modernizr.localstorage) {
    const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return favorites ? JSON.parse(favorites) : []
  }

  return []
}
