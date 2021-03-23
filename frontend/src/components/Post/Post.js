import { Link as ReactRouterLink } from 'react-router-dom';
import { Text, Link } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import './Post.css';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AssistantIcon from '@material-ui/icons/Assistant';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  deleteReport,
  setReportToBeingProcessed,
  setReportToBeingProcessedAsOfficer,
  setReportToDone,
  setReportToDoneAsOfficer,
} from '../../actions/reportActions';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@chakra-ui/avatar';
import { Badge, Box, Spacer } from '@chakra-ui/layout';
import AdminActionsButton from '../AdminActionsButton';
import { Tooltip } from '@material-ui/core';
import { isEmpty } from 'lodash';

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

  async function verifyHandlerOfficer() {
    dispatch(setReportToBeingProcessedAsOfficer(_id));
  }

  async function setToDoneHandlerOfficer() {
    dispatch(setReportToDoneAsOfficer(_id));
  }
  return (
    !isEmpty(userInfo) && (
      <>
        {filtered.map((report) => (
          <div key={report.index} className="post">
            <div className="post__top">
              <Avatar name={name} className="post__avatar" />
              <div className="post__topInfo">
                <h3 className="font-weight-bold">{username}</h3>
                <p className="font-weight-light">
                  {moment(createdAt).fromNow()}
                </p>
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
              {!isEmpty(userInfo) && userInfo.isAdmin
                ? report.index !== 2 && (
                    <>
                      <Spacer />
                      <AdminActionsButton
                        report={report}
                        setToDoneHandler={setToDoneHandler}
                        verifyHandler={verifyHandler}
                      />
                    </>
                  )
                : null}
              {!isEmpty(userInfo) && userInfo.isOfficer
                ? report.index !== 2 && (
                    <>
                      <Spacer />
                      <AdminActionsButton
                        report={report}
                        setToDoneHandler={setToDoneHandlerOfficer}
                        verifyHandler={verifyHandlerOfficer}
                      />
                    </>
                  )
                : null}
            </div>
            <div className="post__bottom">
              <p>{description}</p>
            </div>
            <div className="post__image">
              <img src={image} alt="" />
            </div>

            <div className="post__options">
              <Tooltip title="Klik untuk menuju halaman komentar">
                <Box
                  as={ReactRouterLink}
                  to={`/report/${_id}/comment`}
                  className="post__option"
                >
                  <ChatBubbleOutlineIcon />
                  <p>
                    <b>({comments.length})</b> Tanggapan
                  </p>
                </Box>
              </Tooltip>
              <Tooltip
                className="post__tooltip"
                title={
                  (report.index === 0 && 'Laporan telah diajukan') ||
                  (report.index === 1 && 'Laporan telah diverifikasi') ||
                  (report.index === 2 && 'Laporan telah ditangani')
                }
              >
                <div className="post__option">
                  <Badge
                    colorScheme={
                      (report.index === 0 && 'red') ||
                      (report.index === 1 && 'linkedin') ||
                      (report.index === 2 && 'cyan')
                    }
                  >
                    <div className="post__option__status">
                      {(report.index === 0 && <AssignmentReturnedIcon />) ||
                        (report.index === 1 && <AssistantIcon />) ||
                        (report.index === 2 && <AssignmentTurnedInIcon />)}
                      <p>{report.text}</p>
                    </div>
                  </Badge>
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </>
    )
  );
}

export default Post;
