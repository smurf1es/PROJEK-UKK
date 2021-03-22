import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import './Post.css';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  deleteReport,
  setReportToBeingProcessed,
  setReportToDone,
} from '../../actions/reportActions';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@chakra-ui/avatar';
import { Badge, Spacer } from '@chakra-ui/layout';
import AdminActionsButton from '../AdminActionsButton';

function Post({
  data: {
    _id,
    avatar,
    comments,
    username,
    name,
    image,
    description,
    createdAt,
    user,
    reportStatus,
  },
}) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
      {filtered.map((report) => (
        <div key={report.index} className="post">
          <div className="post__top">
            <Avatar name={name} className="post__avatar" />
            <div className="post__topInfo">
              <h3 className="font-weight-bold">{username}</h3>
              <p className="font-weight-light">{moment(createdAt).fromNow()}</p>
            </div>
            {userInfo && userInfo._id === user && (
              <>
                <Spacer />
                <div className="post__topButton">
                  <Button colorScheme="red" onClick={deleteHandler}>
                    <DeleteIcon />
                  </Button>
                </div>
              </>
            )}
            {userInfo && userInfo.isAdmin ? (
              report.index !== 2 ? (
                <>
                  <Spacer />
                  <AdminActionsButton
                    report={report}
                    setToDoneHandler={setToDoneHandler}
                    verifyHandler={verifyHandler}
                  />
                </>
              ) : null
            ) : null}
          </div>
          <div className="post__bottom">
            <p>{description}</p>
          </div>
          <div className="post__image">
            <img src={image} alt="" />
          </div>

          <div className="post__options">
            <div className="post__option">
              <ChatBubbleOutlineIcon />
              <Link
                className="post__option__link"
                to={`/report/${_id}/comment`}
              >
                <p>({comments.length}) Komentar</p>
              </Link>
            </div>
            <div className="post__option">
              <Badge
                colorScheme={
                  (report.index === 0 && 'red') ||
                  (report.index === 1 && 'linkedin') ||
                  (report.index === 2 && 'cyan')
                }
              >
                {report.text}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
