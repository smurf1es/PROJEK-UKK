import { useEffect } from 'react';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../actions/reportActions';
import Feed from '../components/Feed/Feed';

const HomePage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportCreate = useSelector((state) => state.reportCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = reportCreate;

  const reportDelete = useSelector((state) => state.reportDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reportDelete;

  const reportToBeingProcessed = useSelector(
    (state) => state.reportToBeingProcessed
  );
  const {
    success: successSetToBeingProcessed,
    loading: loadingSetToBeingProcessed,
  } = reportToBeingProcessed;

  const reportToDone = useSelector((state) => state.reportToDone);
  const { success: successSetToDone, loading: loadingSetToDone } = reportToDone;

  useEffect(() => {
    document.title = 'Home - Web Pelaporan Masyarakat';
    if (!userInfo) history.push('/login');
    if (
      successCreate ||
      successDelete ||
      successSetToBeingProcessed ||
      successSetToDone
    ) {
      dispatch(fetchReports());
    }
  }, [
    dispatch,
    successCreate,
    successDelete,
    history,
    userInfo,
    successSetToBeingProcessed,
    successSetToDone,
  ]);

  return loadingCreate ||
    loadingDelete ||
    loadingSetToBeingProcessed ||
    loadingSetToDone ? (
    <Spinner display="block" mt="6" mx="auto" size="md" />
  ) : (
    <Flex alignItems="center" flexDirection="column" as="div">
      {errorDelete && (
        <Alert status="error">
          <AlertIcon />
          {errorDelete}
        </Alert>
      )}
      {errorCreate && (
        <Alert status="error">
          <AlertIcon />
          {errorCreate}
        </Alert>
      )}
      <Feed />
    </Flex>
  );
};

export default HomePage;
