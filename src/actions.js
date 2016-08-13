export const play = (title, name) => ({
  type: 'PLAY',
  title,
  name
})

export const stop = () => ({
  type: 'STOP'
})
