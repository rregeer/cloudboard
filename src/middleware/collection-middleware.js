import { TOGGLE_COLLECTION, COLLAPSED_COLLECTIONS_STORAGE_KEY } from '../constants'

export default function collectionMiddleware({ getState }) {
  return next => action => {
    next(action) // eslint-disable-line callback-return

    if (action.type === TOGGLE_COLLECTION) {
      const { collections } = getState()
      storeCollapsedCollections(collections)
    }
  }
}

function storeCollapsedCollections(collections) {
  const collapsedCollections = collections
    .filter(collection => collection.collapsed)
    .map(collection => collection.name)

  localStorage.setItem(COLLAPSED_COLLECTIONS_STORAGE_KEY, JSON.stringify(collapsedCollections))
}
