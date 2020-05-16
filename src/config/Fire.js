import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
  const firebaseConfig = {
    apiKey: "AIzaSyBMPMKYba0QsSRKH4cby1WKenFgTlI16yY",
    authDomain: "demoproject-a62a8.firebaseapp.com",
    databaseURL: "https://demoproject-a62a8.firebaseio.com",
    projectId: "demoproject-a62a8",
    storageBucket: "demoproject-a62a8.appspot.com",
    messagingSenderId: "86371532305",
    appId: "1:86371532305:web:0ccc3eaf8d663d62633bb0",
    measurementId: "G-P1CK7CS8XD"
  };

 const fire=firebase.initializeApp(firebaseConfig);
 const storage = firebase.storage();
 export  {
  storage, fire as default
}
