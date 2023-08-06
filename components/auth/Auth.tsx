import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function Auth() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setmode] = useState("login");

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login to Continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {mode === "signup" && <Signup></Signup>}
            {mode === "login" && <Login></Login>}
            <div className="text-center">
              {mode == "signup" && (
                <span>
                  Need an account?{" "}
                  <Button colorScheme="teal" variant="link">
                    Signup
                  </Button>
                </span>
              )}
              {mode == "login" && (
                <span>
                  Already an account?{" "}
                  <Button colorScheme="teal" variant="link">
                    Login
                  </Button>
                </span>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
