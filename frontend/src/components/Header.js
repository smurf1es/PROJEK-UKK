import { Avatar } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
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
    <Flex
      alignItems="center"
      height="12.5vh"
      position="sticky"
      backgroundColor="telegram.500"
    >
      <Container padding="4" maxW="4xl">
        <Flex>
          <Box p="2">
            <Heading color="whiteAlpha.900" size="md">
              Wadul.in
            </Heading>
          </Box>
          <Spacer />
          <Box display="flex" alignItems="center">
            {userInfo ? (
              <>
                <Link to={`/profile/${userInfo ? userInfo.username : '404'}`}>
                  <Avatar name={userInfo ? userInfo.name : '404'} />
                </Link>
                <Button
                  onClick={logoutHandler}
                  marginLeft="4"
                  colorScheme="red"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/register" colorScheme="facebook" mr="4">
                  Sign Up
                </Button>
                <Button as={Link} to="/login" colorScheme="yellow">
                  Log in
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
