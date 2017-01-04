import { ADD_FAVORITE, REMOVE_FAVORITE, FAVORITES_STORAGE_KEY } from '../constants'

export default function favoritesMiddleware({ getState }) {
  return next => action => {
    next(action) // eslint-disable-line callback-return

    if (action.type === ADD_FAVORITE || action.type === REMOVE_FAVORITE) {
      const { favorites } = getState()
      storeFavorites(favorites)
    }
  }
}

function storeFavorites(favorites) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
}
