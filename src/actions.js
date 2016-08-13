export const queue = name => ({
  type: 'QUEUE',
  name
})

export const play = (name, title) => ({
  type: 'PLAY',
  title,
  name
})

export const stopped = () => ({
  type: 'STOPPED',
  name
})
