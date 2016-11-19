import { mapReducers } from 'redux-map-reducers'
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants'

const reducerMap = {
  [ADD_FAVORITE]: addFavorite,
  [REMOVE_FAVORITE]: removeFavorite
}

function addFavorite(state, { collection, sound }) {
  return [...state, { collection, sound }]
}

function removeFavorite(state, { collection, sound }) {
  return state.filter(favorite => !(
    favorite.collection === collection &&
    favorite.sound === sound
  ))
}

export default mapReducers(reducerMap, [])
