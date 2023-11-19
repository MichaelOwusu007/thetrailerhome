
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCgPCHW1HYDI4PAUEQsdJWadYaByCKRDrw",
  authDomain: "thetrailerhome-7b83b.firebaseapp.com",
  projectId: "thetrailerhome-7b83b",
  storageBucket: "thetrailerhome-7b83b.appspot.com",
  messagingSenderId: "497592353672",
  appId: "1:497592353672:web:6228b504e1e72a2295b03d",
  measurementId: "G-KQLDQZT3SQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;