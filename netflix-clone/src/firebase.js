import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { toast } from 'react-toastify';

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
const storage = getStorage(app);

const formatErrorMessage = (error) => {
  if (error.message && error.message.includes('/')) {
    const errorCode = error.message.split('/')[1].split(')')[0];
    return errorCode.replace(/-/g, ' ');
  }
  return error.message;
};

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
    return user; // Return the user object on success
  } catch (error) {
    console.error(error);
    toast.error(formatErrorMessage(error));
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    console.error(error);
    toast.error(formatErrorMessage(error));
    throw error;
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, dataBase, storage, login, signup, logout };
