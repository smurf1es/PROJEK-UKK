import { useEffect } from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportById } from '../actions/reportActions';
import { Flex } from '@chakra-ui/layout';
import CommentItem from '../components/CommentItem';
import CommentModal from '../components/CommentModal';
import { Alert, AlertIcon } from '@chakra-ui/alert';

const CommentPage = ({ history, match }) => {
  const reportId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportDetails = useSelector((state) => state.reportDetails);
  const { loading, report, error } = reportDetails;

  const reportCommentCreate = useSelector((state) => state.reportCommentCreate);
  const { success: successComment } = reportCommentCreate;

  const reportCommentDelete = useSelector((state) => state.reportCommentDelete);
  const { success: successDelete } = reportCommentDelete;

  useEffect(() => {
    document.title = 'Komentar - Web Pelaporan Masyarakat';
    dispatch(fetchReportById(reportId));
    if (!userInfo) history.push('/login');
    if (successComment) dispatch(fetchReportById(reportId));
    if (successDelete) dispatch(fetchReportById(reportId));
  }, [dispatch, reportId, successComment, successDelete, history, userInfo]);

  return loading ? (
    <Spinner display="block" mt="6" mx="auto" size="md" />
  ) : (
    <Flex justifyContent="center" flexDirection="column" alignItems="center">
      <CommentModal reportId={reportId} />
      {error && (
        <Alert w="250px" status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {report &&
        report.comments.map((item) => (
          <CommentItem reportId={reportId} key={item._id} comment={item} />
        ))}
    </Flex>
  );
};

export default CommentPage;
