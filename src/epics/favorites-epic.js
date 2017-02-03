import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'

import { TOGGLE_COLLECTION, COLLAPSED_COLLECTIONS_STORAGE_KEY } from '../constants'
import { getCollapsedCollections } from '../selectors'

export default function favoritesEpic(action$, { getState }) {
  return action$
    .filter(action => action.type === TOGGLE_COLLECTION)
    .map(() => getCollapsedCollections(getState()))
    .do(collections => localStorage.setItem(COLLAPSED_COLLECTIONS_STORAGE_KEY, JSON.stringify(collections)))
    .filter(() => false)
}
