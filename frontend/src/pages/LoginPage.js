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
import { Link as ReachLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import * as Yup from 'yup';

const LoginPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username minimal 5 karakter.')
      .max(10, 'Username maksimal 10 karakter.')
      .required('Username dibutuhkan.'),
    password: Yup.string()
      .min(6, 'Password terlalu pendek, minimal 6 karakter.')
      .max(50, 'Password terlalu panjang, maksimal 50 karakter')
      .required('Password dibutuhkan.'),
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    document.title = 'Login - Web Pelaporan Masyarakat';
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Container paddingTop="10" h="80vh" w="100">
      {error && <Alert status="error">{error}</Alert>}
      <Formik
        validationSchema={loginSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          dispatch(login(values.username, values.password));
        }}
      >
        {() => (
          <Form>
            <Field name="username">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="username" />
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
                    placeholder="password"
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
                  Submit
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Text>Baru di aplikasi?</Text>
                <Text>
                  <Link
                    color="green.600"
                    as={ReachLink}
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Daftar
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

export default LoginPage;
