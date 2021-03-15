import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { Box, Container } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchReports } from '../actions/reportActions';
import Post from './Post';

const Timeline = () => {
  const dispatch = useDispatch();
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Skeleton h="20" />
      ) : (
        reports &&
        reports.map((content) => {
          return (
            <Box my="6" key={content._id}>
              <Post content={content} />
            </Box>
          );
        })
      )}
    </>
  );
};

export default Timeline;
