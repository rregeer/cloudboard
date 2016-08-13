const initialState =  {
  playing: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAY':
      return {
        playing: action.title
      }
    case 'STOP':
      return {
        playing: null
      }
    default:
      return state
  }
}
