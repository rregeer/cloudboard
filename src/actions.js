export const queue = (sound, collection) => ({
  type: 'QUEUE',
  sound,
  collection
})

export const play = (sound, collection, id) => ({
  type: 'PLAY',
  id,
  sound,
  collection
})

export const stopped = id => ({
  type: 'STOPPED',
  id
})
