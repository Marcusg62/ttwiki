import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = createContext<any>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      console.log("user", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
