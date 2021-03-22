import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Feed.css';
import ReportSender from '../ReportSender/ReportSender';
import Post from '../Post/Post';
import { fetchReports } from '../../actions/reportActions';
import { Spinner } from '@chakra-ui/spinner';
import { isEmpty } from 'lodash';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Spacer, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

function Feed() {
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const focusHandler = () => {
    document.getElementById('messageSender__input').focus();
  };

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div className="feed">
      {!loading && isEmpty(reports) && (
        <Alert status="info" w="500px">
          <AlertIcon />
          <Text>Tidak ada laporan!</Text>
          <Spacer />
          <Button colorScheme="facebook" variant="link" onClick={focusHandler}>
            Buat baru
          </Button>
        </Alert>
      )}
      {(userInfo && !userInfo.isAdmin) || (userInfo && !userInfo.isOfficer) ? (
        <ReportSender />
      ) : null}
      {!loading &&
        !isEmpty(reports) &&
        reports.map((report) => <Post key={report._id} data={report} />)}
    </div>
  );
}

export default Feed;
