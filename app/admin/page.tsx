"use client";
import Nav from "@/components/Nav";
import { useAuthContext } from "@/context/AuthContext";
import { signout } from "@/firebase/auth/signup";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HostList from "./HostList";
import { getDb } from "@/firebase/firestore/addData";
import { collection, onSnapshot } from "firebase/firestore";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [hosts, sethosts] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      const colRef = collection(db, "hosts");
      onSnapshot(colRef, (snapshot) => {
        let result: any = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
          console.log("host", { ...doc.data(), id: doc.id });
        });
        sethosts(result);
      });
    }
  }, [user]);

  async function clickSignout() {
    let result = await signout();
    console.log("signout", result);
  }

  const db = getDb();

  return (
    // <AuthContextProvider>
    <div>
      <Nav></Nav>
      <div>
        <Button
          m={"8px"}
          colorScheme="red"
          variant="solid"
          onClick={clickSignout}
        >
          Sign Out
        </Button>
        <HostList hosts={hosts}></HostList>
      </div>
    </div>
    // {/* </AuthContextProvider> */}
  );
}
