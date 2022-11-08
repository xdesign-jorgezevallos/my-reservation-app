import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { ref, get } from "firebase/database";

import { USER_EMAIL, USER_SESSION_ROLE, USER_UID } from "../../constants/localstorage";
import { authFB, googleProvider, realtimeDB } from "../init";

const hasRoleAdmin = async (uid: string): Promise<boolean> => {
  const reservationRef = ref(realtimeDB, `restaurant/admin/${uid}`);
  const snapshot = await get(reservationRef);
  const data = snapshot.val();
  return data?.email;
};

export const signInEmailAndPassword = async (email: string, password: string) => {
  try {
    const userData = await signInWithEmailAndPassword(authFB, email, password);
    if (userData) {
      const isAdmin = await hasRoleAdmin(userData.user.uid);
      const userRole = !!isAdmin ? "Admin" : "User";

      localStorage.setItem(USER_UID, userData.user.uid);
      localStorage.setItem(USER_EMAIL, userData.user.email || "");
      localStorage.setItem(USER_SESSION_ROLE, userRole);

      return {
        user: {
          userUID: userData.user.uid,
          email: userData.user.email,
          displayName: userData.user?.displayName,
          role: userRole,
        },
      };
    }
  } catch (error) {
    console.log("Error login: ", error);
  }
};

export const signInWithGoogle = async () => {
  signInWithPopup(authFB, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signOut = (): boolean => {
  try {
    authFB.signOut();
    localStorage.removeItem(USER_UID);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_SESSION_ROLE);
    return true;
  } catch (error) {
    return false;
  }
};
