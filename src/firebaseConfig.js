// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYwcDK4XNPVpE-MQWpHUD3Ve3q1D92oKg",
  authDomain: "formula-e-livehub.firebaseapp.com",
  projectId: "formula-e-livehub",
  storageBucket: "formula-e-livehub.appspot.com",
  messagingSenderId: "300056498158",
  appId: "1:300056498158:web:0eb2d129eb86eff3db88ff",
  measurementId: "G-LMRWXHSNBG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
