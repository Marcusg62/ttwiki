import React from "react";
import Image from "next/image";
import logo from "../public/tt wiki.png";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export default function Nav() {
  return (
    <Box boxShadow={"lg"} padding={"1rem"} backgroundColor={"gray.100"}>
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
    </Box>
  );
}
