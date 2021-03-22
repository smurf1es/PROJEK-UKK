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
                  <Link className="mr-3" to="/admin">
                    Admin
                  </Link>
                  <Link className="mr-3" to="/admin/create-admin">
                    Create Admin
                  </Link>
                  <Link className="mr-3" to="/admin/create-officer">
                    Create Officer
                  </Link>
                </>
              )}
              {userInfo.isOfficer && (
                <Link className="mr-3" to="/officer">
                  Officer
                </Link>
              )}
              <Button color="white" variant="outline" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="ml-3">
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
