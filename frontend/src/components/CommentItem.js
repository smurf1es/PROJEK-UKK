import { Avatar } from '@chakra-ui/avatar';
import { Spinner, Tag } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Text, Spacer } from '@chakra-ui/layout';
import moment from 'moment';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentReport } from '../actions/reportActions';

const CommentItem = ({ comment, reportId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  async function deleteHandler() {
    dispatch(deleteCommentReport({ reportId, commentId: comment._id }));
  }

  return (
    <Box display="flex" alignItems="center" maxW="md" w="250px" my="4" as="div">
      <Avatar name={comment.username} />
      <Flex ml="4" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Text fontWeight="bold" fontSize="sm">
            {comment.username}
          </Text>
          {comment.isAdmin && (
            <Badge ml="2" colorScheme="red">
              Admin
            </Badge>
          )}
          {comment.isOfficer && (
            <Badge ml="2" colorScheme="red">
              Officer
            </Badge>
          )}
        </Box>

        <p>{comment.text}</p>
        <p>{moment(comment.createdAt).format('DD MMM YYYY')}</p>
      </Flex>

      {userInfo ? (
        userInfo._id === comment.user && (
          <Fragment>
            <Spacer />
            <Tag colorScheme="red" onClick={deleteHandler} as="button">
              <DeleteIcon />
            </Tag>
          </Fragment>
        )
      ) : (
        <Spinner size="sm" />
      )}
    </Box>
  );
};

export default CommentItem;
