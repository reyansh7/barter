import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDngEkx9n7GUMbvhvH6N4JwdTnpw4dhiOg",
  authDomain: "barterapp-ce402.firebaseapp.com",
  databaseURL: "https://barterapp-ce402.firebaseio.com",
  projectId: "barterapp-ce402",
  storageBucket: "barterapp-ce402.appspot.com",
  messagingSenderId: "586607636410",
  appId: "1:586607636410:web:a711acb84032de34b0b783"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
