import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { addHost } from "@/firebase/firestore/addData";

export default function HostList({ hosts }: { hosts: any[] }) {
  console.log("host list", hosts);

  const newHostSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required 😱"),
    ttUsername: Yup.string().required("Tiktok username is required 😱"),
  });

  async function submit(
    values: { name: string; ttUsername: string },
    actions: FormikHelpers<{ name: string; ttUsername: string }>
  ) {
    console.log("values", values);
    await addHost(values);
  }
  return (
    <div>
      <Card m={"1rem"} boxShadow="lg" border={""}>
        <CardHeader>
          <Heading size="md">Submit New Host</Heading>
        </CardHeader>
        <CardBody>
          {" "}
          <Formik
            initialValues={{ name: "", ttUsername: "" }}
            validationSchema={newHostSchema}
            onSubmit={async (values, actions) => {
              await submit(values, actions);
            }}
          >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Baby Sosa"
                  ></Field>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.ttUsername && touched.ttUsername}
                >
                  <FormLabel htmlFor="password">Tiktok Username</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>@</InputLeftAddon>
                    <Field
                      as={Input}
                      id="ttUsername"
                      name="ttUsername"
                      placeholder="baby.sosa69"
                      // validate={(value: string) => validatePW(value)}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.ttUsername}</FormErrorMessage>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  w={"100%"}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
      <Card m="1rem" boxShadow="lg">
        <CardBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hosts.map((host) => {
                  return (
                    <Tr key={host.id}>
                      <Td>{host.name}</Td>
                      <Td>{host.socials.tiktok.username}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
}
