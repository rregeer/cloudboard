import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/throttleTime'

import { queue } from '../actions/sound-actions'
import { SOUND_THROTTLE, keyCodeMap, favoriteKeyIndex } from '../constants'

export default function keyEpic(_, { getState }) {
  return Observable.fromEvent(document, 'keyup')
    .throttleTime(SOUND_THROTTLE)
    .map(event => keyCodeMap[event.which])
    .map(key => {
      const index = favoriteKeyIndex.indexOf(key)
      return getState().favorites[index]
    })
    .filter(favorite => favorite)
    .map(favorite => queue(favorite.sound, favorite.collection))
}
