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
} from '@chakra-ui/react';
import { Form, Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin } from '../actions/userActions';
import * as Yup from 'yup';

const RegisterPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Nama minimal 5 karakter.')
      .max(20, 'Nama maksimal 20 karakter.')
      .required('Field nama dibutuhkan.'),
    username: Yup.string()
      .min(5, 'Username minimal 5 karakter.')
      .max(10, 'Username maksimal 10 karakter.')
      .required('Field username dibutuhkan.'),
    password: Yup.string()
      .min(6, 'Password terlalu pendek, minimal 6 karakter.')
      .max(50, 'Password terlalu panjang, maksimal 50 karakter')
      .required('Field password dibutuhkan.'),
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    document.title = 'Create Admin - Web Pelaporan Masyarakat';
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <Container paddingTop="10" h="80vh" w="100">
      {error && <Alert status="error">{error}</Alert>}
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          name: '',
          username: '',
          password: '',
        }}
        onSubmit={({ name, username, password }, actions) => {
          dispatch(createAdmin({ name, username, password }));
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
            <Flex alignItems="center">
              <Box>
                <Button
                  mt={4}
                  colorScheme="facebook"
                  isLoading={loading}
                  type="submit"
                >
                  Tambahkan
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;
