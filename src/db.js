import firebase from 'firebase/app'
import 'firebase/database'

import config from '../etc/db-config.json'

const app = firebase.initializeApp(config)
const db = firebase.database()

export default db
