import { Button } from '@chakra-ui/button';
import { CheckIcon } from '@chakra-ui/icons';
import React from 'react';

const AdminActionsButton = ({ report, verifyHandler, setToDoneHandler }) => {
  return (
    <div className="post__topButton">
      <Button
        colorScheme={
          (report.index === 0 && 'whatsapp') ||
          (report.index === 1 && 'telegram')
        }
        onClick={
          (report.index === 0 && verifyHandler) ||
          (report.index === 1 && setToDoneHandler)
        }
        variant="solid"
      >
        {(report.index === 0 && (
          <div className="d-flex align-items-center">
            <CheckIcon />
            <p className="ml-2">Verifikasikan</p>
          </div>
        )) ||
          (report.index === 1 && (
            <div className="d-flex align-items-center">
              <CheckIcon />
              <p className="ml-2">Selesaikan</p>
            </div>
          ))}
      </Button>
    </div>
  );
};

export default AdminActionsButton;
