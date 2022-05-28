import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
const AuthContext = createContext();
import { auth } from "../firebase-config";
export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email, password) {}
  function signOut() {}

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
