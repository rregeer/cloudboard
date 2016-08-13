const initialState =  {
  queue: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAY': {
      const { title, name } = action
      return {
        queue: [...state.queue, { title, name }]
      }
    }
    case 'STOPPED':
      return {
        queue: state.queue.slice(1, state.queue.length)
      }
    default:
      return state
  }
}
