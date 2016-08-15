export default function reducer(state = [], action) {
  switch (action.type) {
    case 'PLAY': {
      const { sound, collection, id } = action
      return [...state, { sound, collection, id }]
    }
    case 'STOPPED':
      return state.filter((item) => item.id !== action.id)
    default:
      return state
  }
}
