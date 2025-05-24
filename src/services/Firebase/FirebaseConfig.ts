// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbnFP4rQY2ZEj4B_-EpYtUcCQ7PrtWCUc",
  authDomain: "gestor-tareas-97e76.firebaseapp.com",
  projectId: "gestor-tareas-97e76",
  storageBucket: "gestor-tareas-97e76.firebasestorage.app",
  messagingSenderId: "108578649048",
  appId: "1:108578649048:web:896241e8a78565307638ad",
  measurementId: "G-BW450YDVX5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const registerUser = async (email: string, password: string) => {
	try {
    console.log("Registering user with email:", email);
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log(userCredential.user);
		return { isRegistered: true, user: userCredential };
	} catch (error) {
		console.error(error);
		return { isRegistered: false, error: error };
	}
};

const loginUser = async (email: string, password: string) => {
  try {
    console.log("Logging in user with email:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return { isLoggedIn: true, user: userCredential };
  } catch (error) {
    console.error(error);
    return { isLoggedIn: false, error: error };
  }
}

export { db, auth, registerUser, loginUser};