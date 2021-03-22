import { useSelector } from 'react-redux';
import * as Chakra from '@chakra-ui/react';
import { useEffect } from 'react';
import AdminCards from '../components/AdminCards';
import { Alert, Spinner } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

const GenerateReportPage = ({ history }) => {
  const reportList = useSelector((state) => state.reportList);
  const { error, reports } = reportList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUserInfo, userInfo } = userLogin;

  useEffect(() => {
    if (!loadingUserInfo && !userInfo) history.push('/login');
  }, [loadingUserInfo, history, userInfo]);

  return (
    <Chakra.Container maxW="container.md">
      {error && <Alert status="error">{error}</Alert>}
      {!isEmpty(reports) ? (
        <AdminCards />
      ) : (
        <Spinner display="block" my="12" mx="auto" size="lg" />
      )}
    </Chakra.Container>
  );
};

export default GenerateReportPage;
