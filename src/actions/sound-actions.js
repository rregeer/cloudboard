import { QUEUE, PLAY, STOPPED } from '../constants'

export const queue = (sound, collection) => ({
  type: QUEUE,
  sound,
  collection
})

export const play = (id, collection, sound) => ({
  type: PLAY,
  id,
  sound,
  collection
})

export const stopped = id => ({
  type: STOPPED,
  id
})
