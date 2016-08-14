export const queue = (sound, collection) => ({
  type: 'QUEUE',
  sound,
  collection
})

export const play = (sound, collection) => ({
  type: 'PLAY',
  sound,
  collection
})

export const stopped = () => ({
  type: 'STOPPED'
})
