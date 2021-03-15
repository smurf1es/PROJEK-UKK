import { Avatar, Badge, Button, Image, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DeleteReportBtn from './DeleteReportBtn';
import {
  deleteReport,
  setReportToBeingProcessed,
  setReportToDone,
} from '../actions/reportActions';
import { Fragment } from 'react';

const Post = ({
  content: {
    _id,
    comments,
    username,
    image,
    description,
    createdAt,
    user,
    reportStatus,
  },
}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportDelete = useSelector((state) => state.reportDelete);
  const { loading: loadingDelete } = reportDelete;
  const status = [
    {
      index: 0,
      text: 'Telah diajukan',
    },
    {
      index: 1,
      text: 'Telah diverifikasi',
    },
    {
      index: 2,
      text: 'Telah terselesaikan',
    },
  ];
  const filtered = status.filter((stat) => stat.index === reportStatus);

  async function deleteHandler() {
    dispatch(deleteReport(_id));
  }

  async function verifyHandler() {
    dispatch(setReportToBeingProcessed(_id));
  }

  async function setToDoneHandler() {
    dispatch(setReportToDone(_id));
  }

  return (
    <>
      <Box
        maxW="sm"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image objectFit="cover" src={image} alt="alt-img" />

        <Box p="6">
          <Box d="flex" alignItems="center">
            {filtered.map((it) => (
              <Fragment key={it.index}>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={
                    (it.index === 0 && 'orange') ||
                    (it.index === 1 && 'yellow') ||
                    (it.index === 2 && 'green')
                  }
                >
                  <Text>{it.text}</Text>
                </Badge>
                {userInfo && userInfo.isAdmin ? (
                  it.index !== 2 ? (
                    <Button
                      ml="2"
                      size="xs"
                      colorScheme={
                        (it.index === 0 && 'whatsapp') ||
                        (it.index === 1 && 'telegram')
                      }
                      onClick={
                        (it.index === 0 && verifyHandler) ||
                        (it.index === 1 && setToDoneHandler)
                      }
                    >
                      {(it.index === 0 && 'Verifikasikan') ||
                        (it.index === 1 && 'Selesaikan')}
                    </Button>
                  ) : null
                ) : null}
              </Fragment>
            ))}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Text>{moment(createdAt).fromNow()}</Text>
            </Box>
          </Box>
          <Flex mt="4" alignItems="center">
            <Box flex="0.25">
              <Avatar name={username} src="#" />
            </Box>

            <Box flex="0.75" display="flex" flexDir="column">
              <Box
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated={true}
              >
                {username}
              </Box>

              <Box>{description}</Box>
            </Box>
          </Flex>

          <Box alignItems="center" display="flex" mt="4">
            <Link to={`/report/${_id}/comment`}>
              <Text fontSize="xs">{comments.length} komentar</Text>
            </Link>
            <Spacer />
            {userInfo && userInfo._id === user && (
              <Box>
                {loadingDelete ? (
                  <Spinner />
                ) : (
                  <DeleteReportBtn onClick={deleteHandler} />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;
