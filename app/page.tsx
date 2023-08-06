"use client";
import Nav from "@/components/Nav";
import "../components/Nav.css";
import { Button } from "@chakra-ui/react";
import { Providers } from "./providers";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Auth from "@/components/auth/Auth";

export default function Home() {
  return (
    <Providers>
      <div>
        <Nav></Nav>
        <main className="flex justify-center flex-wrap align-center">
          <div className="text-center my-24">
            <h1 className="bold text-4xl">
              Welcome to <span className="font-extrabold">tt wiki</span>!
            </h1>
            <p className="px-4  my-4">
              Find and create a community around your favorite hosts. Tell cute
              and funny stories and spill the tea.{" "}
            </p>
            <Link href="/admin">
              <Button
                variant="outline"
                colorScheme="blue"
                rightIcon={<ArrowForwardIcon />}
              >
                Admin Center
              </Button>
            </Link>
            <Auth></Auth>
          </div>
        </main>
      </div>
    </Providers>
  );
}
