import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyCE0MfyEQ27_OF7-0XzjK53ewmsAG5XT1k",
  authDomain: "cloudboard-d9e1e.firebaseapp.com",
  databaseURL: "https://cloudboard-d9e1e.firebaseio.com",
  storageBucket: "cloudboard-d9e1e.appspot.com",
}

const app = firebase.initializeApp(config)
const db = firebase.database()

export default db
