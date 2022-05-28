import React, { useEffect } from "react";
import SignIn from "../../components/Auth/SignIn";
import Profile from "../../components/Profile";
import { useAuth } from "../../context/AuthContext";
export default function Index() {
  return (
    <>
      <SignIn />
    </>
  );
}
