import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, signOut, sendEmailVerification, User } from "firebase/auth";

const auth = getAuth(firebase_app);


export async function signUpEmailPw(email:string, password:string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    finally {
        if (result?.user) {
            await sendEmailVerification(result.user)
        }
    }

    return { result, error };
}

export async function googleSignin(): Promise<UserCredential | null> {
    const provider = new GoogleAuthProvider();
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
        return result;

    } catch (e) {
        error = e;
        alert(e)
        return null;
    }

}

export async function signout():Promise<any> {
    try {
        return await auth.signOut()
    } catch (error) {
        console.log('error', error)
        alert(error)
    }
}