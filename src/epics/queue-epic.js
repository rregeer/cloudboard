/* global ga */

import shortid from 'shortid'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/merge'

import { QUEUE, SOUND_THROTTLE } from '../constants'
import { SERVER_PLAY } from '../../server/constants'
import { play } from '../actions/sound-actions'
import { serverQueue } from '../../server/events'
import { isInLocalMode } from '../selectors'
import socket from '../socket'

export default function queueEpic(action$, { getState }) {
  const serverAction$ = serverSource()
    .filter(event => event.board === getState().board)
    .map(({ id, collection, sound }) => play(id, collection, sound))

  return action$
    .filter(action => action.type === QUEUE)
    .throttleTime(SOUND_THROTTLE)
    .do(action => {
      const label = action.collection + ':' + action.sound
      ga('send', 'event', 'Soundboard', 'play', label, '')
    })
    .map(action => ({
      action,
      localMode: isInLocalMode(getState()),
      id: shortid.generate()
    }))
    .do(({ action, id, localMode }) => {
      if (!localMode) {
        broadcastSound(getState(), action, id)
      }
    })
    .filter(({ localMode }) => localMode)
    .map(({ action, id }) => {
      const { collection, sound } = action
      return play(id, collection, sound)
    })
    .merge(serverAction$)
}

function broadcastSound({ board }, action, id) {
  const { collection, sound } = action
  const { event, data } = serverQueue(id, board, collection, sound)
  socket.emit(event, data)
}

function serverSource() {
  return Observable.create(observer => {
    socket.on(SERVER_PLAY, event => {
      observer.next(event)
    })
  })
}
