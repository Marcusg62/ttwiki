"use client";
import Nav from "@/components/Nav";
import "../components/Nav.css";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Auth from "@/components/auth/Auth";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext();
  useEffect(() => {}, [user]);

  return (
    <div>
      <Nav></Nav>
      <main className="flex justify-center flex-wrap align-center">
        <div className="text-center my-24">
          <pre>{JSON.stringify(user)}</pre>
          <h1 className="bold text-4xl">
            Welcome to <span className="font-extrabold">tt wiki</span>!
          </h1>
          <p className="px-4  my-4">
            Find and create a community around your favorite hosts. Tell cute
            and funny stories and spill the tea.{" "}
          </p>

          <Auth></Auth>
        </div>
      </main>
    </div>
  );
}
