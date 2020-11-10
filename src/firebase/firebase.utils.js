import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBBEKnauoYmj8TfcZ79UDo-DIVXcqlfuTU",
    authDomain: "eshop-crown-db.firebaseapp.com",
    databaseURL: "https://eshop-crown-db.firebaseio.com",
    projectId: "eshop-crown-db",
    storageBucket: "eshop-crown-db.appspot.com",
    messagingSenderId: "388703815772",
    appId: "1:388703815772:web:54cbbabf82bddfa014be99",
    measurementId: "G-92913EYGSG"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log('enter createUserProfileDocument function')
    if(!userAuth) return;
    //query step1: make a document ref with uid to inform firebase
    console.log('createUserProfileDocument: start producing userRef1');
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('createUserProfileDocument: produce userRef1', userRef);
    
    //quer step2: search in firebase if user id exists and firebase response with a document snapshot
    const snapShot = await userRef.get();
    console.log('createUserProfileDocument: produce snapShot1',snapShot); //it doesnt have the user data. unless call snapShot.data()

    //'exists' indicates if document exists in db
    if(!snapShot.exists){
      console.log('createUserProfileDocument: snapShot.exists: false');
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try{
        console.log('create new user in DB');
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        }, () => console.log('confirm new user created in db'))
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    //for later use
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;