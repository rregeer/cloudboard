import { mapReducers } from 'redux-map-reducers'
import { TOGGLE_COLLECTION } from '../constants'

const reducerMap = {
  [TOGGLE_COLLECTION]: toggleCollection
}

function toggleCollection(state, { name }) {
  return state.map(collection => {
    if (collection.name !== name) {
      return collection
    }

    return {
      ...collection,
      collapsed: !collection.collapsed
    }
  })
}

export default mapReducers(reducerMap, [])
