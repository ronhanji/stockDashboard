import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {getDatabase, ref,onValue, get,set} from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREVASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
})

export const auth = app.auth()

export function writeData(userId, stocks){
    const db = getDatabase();
    const reference= ref(db,'users/' + userId)
    console.log('reference: ', ref)
    set(reference, {
        stocks
    })
}

/*export function readData(userId){
    const db = getDatabase();
    const reference= ref(db,'users/' + userId)
    onValue(reference, (snapshot) => {
        const data = snapshot.val()
        
        return data
    })
}*/

export default app


