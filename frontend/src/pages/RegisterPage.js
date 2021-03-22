import { useEffect } from 'react';
import {
  Alert,
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Spacer,
  Text,
  Link,
} from '@chakra-ui/react';
import { Form, Formik, Field } from 'formik';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import * as Yup from 'yup';

const RegisterPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Nama minimal 5 karakter.')
      .max(20, 'Nama maksimal 20 karakter.')
      .required('Field nama dibutuhkan.'),
    nik: Yup.string()
      .min(16, 'NIK minimal 16 karakter.')
      .max(16, 'NIK maksimal 16 karakter.')
      .required('Field NIK dibutuhkan.'),
    username: Yup.string()
      .min(5, 'Username minimal 5 karakter.')
      .max(10, 'Username maksimal 10 karakter.')
      .required('Field username dibutuhkan.'),
    password: Yup.string()
      .min(6, 'Password terlalu pendek, minimal 6 karakter.')
      .max(50, 'Password terlalu panjang, maksimal 50 karakter')
      .required('Field password dibutuhkan.'),
    phoneNumber: Yup.number().required('Nomor telepon dibutuhkan.'),
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    document.title = 'Register - Web Pelaporan Masyarakat';
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Container paddingTop="10" h="80vh" w="100">
      {error && <Alert status="error">{error}</Alert>}
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          name: '',
          nik: '',
          username: '',
          password: '',
          phoneNumber: '',
        }}
        onSubmit={({ name, nik, username, password, phoneNumber }, actions) => {
          dispatch(register({ name, username, password, nik, phoneNumber }));
        }}
      >
        {() => (
          <Form>
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Nama</FormLabel>
                  <Input {...field} id="name" placeholder="masukkan nama..." />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="nik">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.nik && form.touched.nik}>
                  <FormLabel htmlFor="nik">NIK</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    id="nik"
                    placeholder="masukkan NIK..."
                  />
                  <FormErrorMessage>{form.errors.nik}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="username">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="masukkan username..."
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="masukkan password..."
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phoneNumber">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel htmlFor="phoneNumber">Nomor Telepon</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    id="phoneNumber"
                    placeholder="masukkan nomor telepon..."
                  />
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex alignItems="center">
              <Box>
                <Button
                  mt={4}
                  colorScheme="facebook"
                  isLoading={loading}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Text>Sudah terdaftar?</Text>
                <Text>
                  <Link
                    color="green.600"
                    as={ReactLink}
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    Login
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;
