import { useSelector } from 'react-redux';
import * as Chakra from '@chakra-ui/react';
import { useEffect } from 'react';
import AdminCards from '../components/AdminCards';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

const GenerateReportPage = ({ history }) => {
  const reportList = useSelector((state) => state.reportList);
  const { error, loadingReports, reports } = reportList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUserInfo, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [history, userInfo]);

  return (
    <Chakra.Container maxW="container.md">
      {error && <Alert status="error">{error}</Alert>}
      {!loadingReports && !isEmpty(reports) ? (
        <AdminCards />
      ) : (
        <Alert mt="6" w="300px" mx="auto" status="info">
          <AlertIcon />
          Belum ada laporan diajukan
        </Alert>
      )}
    </Chakra.Container>
  );
};

export default GenerateReportPage;
