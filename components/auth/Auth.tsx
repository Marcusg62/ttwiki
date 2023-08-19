import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { FcGoogle } from "react-icons/fc";
import { googleSignin } from "@/firebase/auth/signup";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Auth() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setmode] = useState("login");

  const { user } = useAuthContext();
  useEffect(() => {}, [user]);

  async function loginWithGoogle() {
    let result: UserCredential | null = await googleSignin();
    if (result) {
      console.log("result", result);
      router.push("/admin");
    }
  }
  function navigateToAdmin() {
    if (!user) {
      onOpen();
    } else {
      router.push("/admin");
    }
  }
  return (
    <>
      <Button
        variant="outline"
        colorScheme="blue"
        rightIcon={<ArrowForwardIcon />}
        onClick={navigateToAdmin}
      >
        Admin Center
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login to Continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {mode === "signup" && <Signup></Signup>}
            {mode === "login" && <Login></Login>}
            <Button
              mt={4}
              colorScheme="gray"
              w={"100%"}
              rightIcon={<Icon as={FcGoogle} />}
              onClick={loginWithGoogle}
            >
              Login with Google
            </Button>
            <Box className="text-center" fontSize={"xs"}>
              {mode == "login" && (
                <span
                  onClick={() => setmode("signup")}
                  className="flex items-center justify-center"
                >
                  Need an account?{" "}
                  <Button fontSize={"xs"} colorScheme="teal" variant="ghost">
                    Signup
                  </Button>
                </span>
              )}
              {mode == "signup" && (
                <span
                  onClick={() => setmode("login")}
                  className="flex items-center justify-center"
                >
                  Already have an account?{" "}
                  <Button fontSize={"xs"} colorScheme="teal" variant="ghost">
                    Login
                  </Button>
                </span>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
