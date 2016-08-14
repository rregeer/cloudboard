export default function reducer(state = [], action) {
  switch (action.type) {
    case 'PLAY': {
      const { sound, collection } = action
      return [...state, { sound, collection }]
    }
    case 'STOPPED':
      return state.slice(1, state.length)
    default:
      return state
  }
}
