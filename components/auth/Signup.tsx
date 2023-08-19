import { signUpEmailPw } from "@/firebase/auth/signup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

export default function Signup() {
  const router = useRouter();
  function validatePW(pw: string) {
    let error;
    if (pw.length < 8) {
      error = "Password must be atleast 8 characters 😱";
    }
    return error;
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required 😱"),
    password: Yup.string()
      .min(8, "Passwords must be atleast 8 characters 😱")
      .max(30, "Password is too Long 😱")
      .required("Password is required 😱"),
  });

  async function submitSignup(
    values: { email: string; password: string },
    actions: FormikHelpers<{ email: string; password: string }>
  ) {
    console.log("values", values);
    console.log("actions", actions);
    try {
      if (await signUpEmailPw(values.email, values.password)) {
        router.push("/admin");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      {" "}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          await submitSignup(values, actions);
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                variant="filled"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                variant="filled"
                // validate={(value: string) => validatePW(value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              w={"100%"}
              type="submit"
            >
              Create Account
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
