import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnKpuoh87MSUcr0pWi2b_LUpC3-4YavFM",
  authDomain: "netflix-clone-e5a72.firebaseapp.com",
  projectId: "netflix-clone-e5a72",
  storageBucket: "netflix-clone-e5a72.firebasestorage.app",
  messagingSenderId: "351462429460",
  appId: "1:351462429460:web:37915ad8996d34bb306801"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataBase = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(dataBase, 'user'), {
      userId: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, dataBase, login, signup, logout };
