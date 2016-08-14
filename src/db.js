import firebase from 'firebase/app'
import 'firebase/database'

import firebaseConfig from '../etc/firebase.json'

firebase.initializeApp(firebaseConfig)

const db = firebase.database()

export default db
