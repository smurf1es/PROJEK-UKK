import { Button } from '@chakra-ui/button';
import { Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const black = {
    color: '#000',
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Flex w="100" color="white" h="75px" bg="facebook.500">
      <Container alignItems="center" d="flex" maxW="6xl">
        <Link _hover={black} as={ReactRouterLink} to="/">
          <Heading size="md">Lapor.in</Heading>
        </Link>
        <Spacer />
        <Flex alignItems="center">
          {userInfo && <p className="mr-3 font-bold">{userInfo.name}</p>}
          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <>
                  <Link
                    _hover={black}
                    as={ReactRouterLink}
                    className="mr-3"
                    to="/admin"
                  >
                    Admin
                  </Link>
                  <Link
                    _hover={black}
                    as={ReactRouterLink}
                    className="mr-3"
                    to="/admin/create-admin"
                  >
                    Buat Admin
                  </Link>
                  <Link
                    _hover={black}
                    as={ReactRouterLink}
                    className="mr-3"
                    to="/admin/create-officer"
                  >
                    Buat Petugas
                  </Link>
                </>
              )}
              {userInfo.isOfficer && (
                <Link
                  _hover={black}
                  as={ReactRouterLink}
                  className="mr-3"
                  to="/officer"
                >
                  Petugas
                </Link>
              )}
              <Button
                _hover={black}
                color="white"
                variant="outline"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link _hover={black} as={ReactRouterLink} to="/login">
                Login
              </Link>
              <Link
                _hover={black}
                as={ReactRouterLink}
                to="/register"
                className="ml-3"
              >
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
