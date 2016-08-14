import firebase from 'firebase/app'
import 'firebase/database'

import firebaseConfig from '../etc/firebase.json'

const app = firebase.initializeApp(firebaseConfig)
const db = firebase.database()

export default db
