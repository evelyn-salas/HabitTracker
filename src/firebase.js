import { initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqSdweQmbx_QuW9uAFSPZyE-3ZfXvg76M",
  authDomain: "habitbear-6650d.firebaseapp.com",
  databaseURL: "https://habitbear-6650d-default-rtdb.firebaseio.com/",
  projectId: "habitbear-6650d",
  storageBucket: "habitbear-6650d.appspot.com",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const providers = {
  google: new GoogleAuthProvider(),
  email: new EmailAuthProvider(),
};
