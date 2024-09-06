import {
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { ref, get } from 'firebase/database';

import { authFB, googleProvider, realtimeDB } from './firebase-init';

const hasRoleAdmin = async (uid: string): Promise<boolean> => {
    const reservationRef = ref(realtimeDB, `restaurant/admin/${uid}`);
    const snapshot = await get(reservationRef);
    const data = snapshot.val();
    return data?.email ? true : false;
};

export const createAccount = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(authFB, email, password);
    const { user } = userCredential;

    return {
        user: {
            userUID: user.uid,
            email: user.email,
            displayName: user?.displayName || '',
            role: 'User',
        },
    };
};

export const signInEmailAndPassword = async (email: string, password: string) => {
    try {
        const userData = await signInWithEmailAndPassword(authFB, email, password);

        if (userData) {
            const isAdmin = await hasRoleAdmin(userData.user.uid);
            const userRole = isAdmin ? 'Admin' : 'User';
            const { user } = userData;

            return {
                user: {
                    userUID: user.uid,
                    email: user.email,
                    displayName: user?.displayName,
                    role: userRole,
                },
            };
        }
    } catch (error) {
        // @ts-ignore
        const  errorCode = error?.code
        return {
            status:false,
            code: errorCode,
            description: errorCode.split("auth/")[1].replace("-", ' ') as string
        }
        // auth/wrong-password
        // auth/invalid-email
        // auth/missing-password
        // auth/missing-email
    }
};

export const signInWithGoogle = async () => {
    try {
        const responseData = await signInWithPopup(authFB, googleProvider);
        const { user } = responseData;
        const isAdmin = await hasRoleAdmin(user.uid);
        const userRole = isAdmin ? 'Admin' : 'User';

        return {
            user: {
                userUID: user.uid,
                email: user.email,
                displayName: user?.displayName || '',
                role: userRole,
            },
        };
    } catch (error) {
        console.log('error: ', error);
    }
};

export const signOut = (): boolean => {
    try {
        authFB.signOut();
        return true;
    } catch (error) {
        return false;
    }
};
