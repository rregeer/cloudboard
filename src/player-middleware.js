import db from './db'

export default store => next => action => {
  console.log(action)
  if (action.type === 'PLAY') {
    const url = `./sounds/${action.name}.mp3`
    const audio = new Audio(url)

    audio.play()
    db.ref().push(name)
  }

  next(action);
}
