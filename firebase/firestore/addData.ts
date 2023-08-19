import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(
  colllection: string,
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export function getDb() {
  return db;
}

export async function addHost({
  name,
  ttUsername,
}: {
  name: string;
  ttUsername: string;
}): Promise<any> {
  try {
    let socials = {
      tiktok: {
        username: ttUsername,
      },
    };
    const docRef = await addDoc(collection(db, "hosts"), {
      name: name,
      socials: socials,
    });
    return docRef;
  } catch (error) {
    throw error;
  }
}
