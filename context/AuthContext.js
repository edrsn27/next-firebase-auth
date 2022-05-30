import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOutUser() {
    return signOut(auth);
  }

  function changeEmail(newEmail) {
    return updateEmail(currentUser, newEmail);
  }
  function changePassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user == null && router.pathname == "/") {
        router.push("/auth/sign-in");
      } else if (user && router.pathname == "/auth/sign-in") {
        router.push("/");
      }
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signUp, signIn, signOutUser, changePassword,changeEmail };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
