import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { isEmpty } from 'ramda';
import { Spinner } from '@chakra-ui/spinner';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';

const OfficerListPage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUserList, error: errorUserList, users } = userList;

  const filtered =
    !isEmpty(users) && users.filter((item) => item.isAdmin === true);

  useEffect(() => {
    if (isEmpty(users)) {
      dispatch(listUsers());
    }
  }, [dispatch, users]);

  return loadingUserList ? (
    <Spinner mt="4" display="block" mx="auto" size="md" />
  ) : (
    <Fragment>
      {errorUserList && (
        <Alert status="error">
          <AlertIcon />
          Telah terjadi error saat mendapatkan list petugas
        </Alert>
      )}
      <Box as="div">
        <Box as="span">Daftar Petugas :</Box>
        <Box as="div">
          {!isEmpty(filtered) ? (
            filtered.map((filt) => {
              return (
                <Flex as="div">
                  <Box as="div">
                    <Avatar size="sm" name={filt.username} />
                  </Box>
                  <Flex flexDirection="column">
                    <Text ml="2" fontWeight="bold" fontSize="sm">
                      {filt.username}
                    </Text>
                    <Text as="a" href={`tel:${filt.phoneNumber}`}>
                      Hubungi
                    </Text>
                  </Flex>
                </Flex>
              );
            })
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default OfficerListPage;
