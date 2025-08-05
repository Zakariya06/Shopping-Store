import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { signIn, signUp, logOut } from "@/services/auth/authServices";
import { auth } from "@/firebase/firebaseConfig";

type TAuthContext = {
  user: User | null;
  signIn: typeof signIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const AuthContext = createContext<TAuthContext>({
  user: null,
  signIn,
  signUp,
  logOut,
  loading: true,
  setLoading: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
    });
    setLoading(false);
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const values = {
    user,
    signIn,
    signUp,
    logOut,
    loading,
    setLoading,
  };

  return (
    <>
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    </>
  );
};
