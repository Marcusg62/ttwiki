import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import React from "react";

export default function Login() {
  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ email: "", pw: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props: any) => (
        <Form>
          <Field name="email" validate={validateName}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={(form.errors.name && form.touched.name) as boolean}
              >
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder="user@example.com" />
                <FormErrorMessage>
                  {form.errors.name as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="pw" validate={validateName}>
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={(form.errors.name && form.touched.name) as boolean}
              >
                <FormLabel>Password</FormLabel>
                <Input {...field} placeholder="" type="password" />
                <FormErrorMessage>
                  {form.errors.name as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="button"
            w={"100%"}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
