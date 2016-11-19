import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants'

export function addFavorite(collection, sound) {
  return {
    type: ADD_FAVORITE,
    collection,
    sound
  }
}

export function removeFavorite(collection, sound) {
  return {
    type: REMOVE_FAVORITE,
    collection,
    sound
  }
}
