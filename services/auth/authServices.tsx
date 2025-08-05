import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const signIn = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.log("sign In Error ::", error.code);
  }
};

const signUp = async ( email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("signUp error ::", error.code);
    toast.error(error.message);
    return null;
  }
};

const logOut = () => {
  return signOut(auth);
};

const signInWithGoogle = () => {
  
}

export { signIn, signUp, logOut };
