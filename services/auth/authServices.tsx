import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
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

const signUp = async (email: string, password: string) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // for to show the login page
    await signOut(auth);
    return createdUser;
  } catch (error: any) {
    console.error("signUp error ::", error.code);
    toast.error(error.message);
    return null;
  }
};

const logOut = () => {
  return signOut(auth);
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  return await signInWithPopup(auth, provider);
};

export { signIn, signUp, logOut, signInWithGoogle, signInWithGithub };
