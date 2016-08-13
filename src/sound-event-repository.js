import Firebase from 'firebase/database'

export default class SoundEventRepository {
  constructor(db) {
    this._db = db
  }

  pushToQueue(name) {
    this._db.ref().push({
      time: Firebase.ServerValue.TIMESTAMP,
      name
    })
  }

  listenForChanges(onChange) {
    this._db.ref()
      .orderByChild('time')
      .startAt(Date.now())
      .on('child_added', snapshot => {
        onChange(snapshot.val())
      })
  }
}
