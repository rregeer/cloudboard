import Firebase from 'firebase/database'

export default class SoundEventRepository {
  constructor(db) {
    this._db = db
    this._board = null
  }

  pushToQueue(sound, collection) {
    this._db.ref(this._board).push({
      time: Firebase.ServerValue.TIMESTAMP,
      sound,
      collection
    })
  }

  setBoard(board) {
    this._board = board
  }

  listenForChanges(onChange) {
    const ref = this._db.ref(this._board)

    ref.orderByChild('time')
      .startAt(Date.now())
      .on('child_added', snapshot => {
        onChange(snapshot.val())
      })

    return ref
  }
}
