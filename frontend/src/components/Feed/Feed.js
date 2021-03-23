import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Feed.css';
import ReportSender from '../ReportSender/ReportSender';
import Post from '../Post/Post';
import { fetchReports } from '../../actions/reportActions';
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
    !isEmpty(userInfo) && (
      <div className="feed">
        {!loading && isEmpty(reports) && !userInfo.isCivilian && (
          <Alert mx="auto" status="info" w="500px">
            <AlertIcon />
            <Text>Tidak ada laporan!</Text>
          </Alert>
        )}
        {!loading && isEmpty(reports) && userInfo.isCivilian && (
          <Alert status="info" w="500px">
            <AlertIcon />
            <Text>Tidak ada laporan!</Text>
            <Spacer />
            <Button
              colorScheme="facebook"
              variant="link"
              onClick={focusHandler}
            >
              Buat baru
            </Button>
          </Alert>
        )}
        {userInfo.isCivilian && <ReportSender />}
        {!loading &&
          !isEmpty(reports) &&
          reports.map((report) => <Post key={report._id} data={report} />)}
      </div>
    )
  );
}

export default Feed;
