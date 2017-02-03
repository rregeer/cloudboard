import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'

import { stopped } from '../actions/sound-actions'
import { PLAY } from '../constants'
import playAudio from '../audio-player'

export default function playerEpic(action$) {
  return action$
    .filter(action => action.type === PLAY)
    .flatMap(action => {
      const { id, collection, sound } = action
      const url = `/sounds/${collection}/${sound}.mp3`

      return Observable.create(observer => {
        playAudio(url, () => {
          observer.next(stopped(id))
        })
      })
    })
}
