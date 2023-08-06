import React from "react";
import Image from "next/image";
import logo from "../public/tt wiki.png";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="drop-shadow-lg w-full bg-gray-100 p-4">
      <Link href="/">
        <Image
          src={logo}
          alt="Picture of the author"
          // width={100}
          height={50}
          // blurDataURL="data:..." automatically provided
          placeholder="blur" // Optional blur-up while loading
        />
      </Link>
    </div>
  );
}
