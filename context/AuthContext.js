import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { useRouter } from "next/router";

const AuthContext = createContext();

import { auth } from "../firebase-config";
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

  const value = { currentUser, signUp, signIn, signOutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
