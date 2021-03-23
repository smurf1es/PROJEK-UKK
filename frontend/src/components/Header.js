import { Button } from '@chakra-ui/button';
import { Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Flex w="100" color="white" h="75px" bg="facebook.500">
      <Container alignItems="center" d="flex" maxW="6xl">
        <Link as={ReactRouterLink} to="/">
          <Heading size="md">Lapor.in</Heading>
        </Link>
        <Spacer />
        <Flex alignItems="center">
          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <>
                  <Link as={ReactRouterLink} className="mr-3" to="/admin">
                    Admin
                  </Link>
                  <Link
                    as={ReactRouterLink}
                    className="mr-3"
                    to="/admin/create-admin"
                  >
                    Buat Admin
                  </Link>
                  <Link
                    as={ReactRouterLink}
                    className="mr-3"
                    to="/admin/create-officer"
                  >
                    Buat Petugas
                  </Link>
                </>
              )}
              {userInfo.isOfficer && (
                <Link as={ReactRouterLink} className="mr-3" to="/officer">
                  Petugas
                </Link>
              )}
              <Button color="white" variant="outline" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link as={ReactRouterLink} to="/login">
                Login
              </Link>
              <Link as={ReactRouterLink} to="/register" className="ml-3">
                Register
              </Link>
            </>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
