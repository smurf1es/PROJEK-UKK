import { Button } from '@chakra-ui/button';
import { Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Flex w="100" color="white" h="75px" bg="facebook.300">
      <Container alignItems="center" d="flex" maxW="6xl">
        <Heading size="md">Lapor.in</Heading>
        <Spacer />
        <Flex alignItems="center">
          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <Link className="mr-3" to="/admin">
                  Admin
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
