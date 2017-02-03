import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'

import { ADD_FAVORITE, REMOVE_FAVORITE, FAVORITES_STORAGE_KEY } from '../constants'

export default function collectionEpic(action$, { getState }) {
  return action$
    .filter(action => action.type === ADD_FAVORITE || action.type === REMOVE_FAVORITE)
    .map(() => getState().favorites)
    .do(favorites => localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites)))
    .filter(() => false)
}
