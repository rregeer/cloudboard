import Firebase from 'firebase/database'

export default class SoundEventRepository {
  constructor(db) {
    this._db = db
  }

  pushToQueue(sound, collection) {
    this._db.ref().push({
      time: Firebase.ServerValue.TIMESTAMP,
      sound,
      collection
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
