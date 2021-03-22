import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Feed.css';
import ReportSender from '../ReportSender/ReportSender';
import Post from '../Post/Post';
import { fetchReports } from '../../actions/reportActions';
import { Spinner } from '@chakra-ui/spinner';
import { isEmpty } from 'lodash';

function Feed() {
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return !loading ? (
    <div className="feed">
      {userInfo && userInfo.isAdmin === false ? <ReportSender /> : null}
      {!isEmpty(reports) &&
        reports.map((report) => <Post key={report._id} data={report} />)}
    </div>
  ) : (
    <Spinner my="6" size="lg" />
  );
}

export default Feed;
