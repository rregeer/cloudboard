const initialState =  {
  queue: [],
  collections: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAY': {
      const { sound, collection } = action
      return {
        ...state,
        queue: [...state.queue, { sound, collection }]
      }
    }
    case 'STOPPED':
      return {
        ...state,
        queue: state.queue.slice(1, state.queue.length)
      }
    default:
      return state
  }
}
