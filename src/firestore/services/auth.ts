import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, get } from "firebase/database";

import { authFB, googleProvider, realtimeDB } from "../init";
import { USER_EMAIL, USER_SESSION_ROLE, USER_UID } from "../../constants/localstorage";

const hasRoleAdmin = async (uid: string): Promise<boolean> => {
  const reservationRef = ref(realtimeDB, `restaurant/admin/${uid}`);
  const snapshot = await get(reservationRef);
  const data = snapshot.val();
  return data?.email;
};

const saveUserDataLocalStorage = async (user:any, role:string) => {
  localStorage.setItem(USER_UID, user.uid);
  localStorage.setItem(USER_EMAIL, user.email || "");
  localStorage.setItem(USER_SESSION_ROLE, role);
}

export const createAccount = async (email:string, password:string) => {
  console.log('email',email)
  console.log('password',password)
  const userCredential = await createUserWithEmailAndPassword(authFB, email, password);
  const { user } = userCredential;
  await saveUserDataLocalStorage(user, "User")

  return {
    user: {
      userUID: user.uid,
      email: user.email,
      displayName: user?.displayName || "",
      role: "User",
    },
  };
}

export const signInEmailAndPassword = async (email: string, password: string) => {
  try {
    const userData = await signInWithEmailAndPassword(authFB, email, password);
    if (userData) {
      const isAdmin = await hasRoleAdmin(userData.user.uid);
      const userRole = !!isAdmin ? "Admin" : "User";
      const { user } = userData;
      await saveUserDataLocalStorage(user, userRole)

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
  try {
    const responseData = await signInWithPopup(authFB, googleProvider);
    const user = responseData.user;
    await saveUserDataLocalStorage(user, "User")

    return {
      user: {
        userUID: user.uid,
        email: user.email,
        displayName: user?.displayName || "",
        role: "User",
      },
    };
  } catch (error) {
    console.log('error: ',error)
  }
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
