import { signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from ".";

export function signInWithGoogle() {
  return signInWithRedirect(auth, new GoogleAuthProvider());
}
export function signUserOut() {
  return signOut(auth);
}
